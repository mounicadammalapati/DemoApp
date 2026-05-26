import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, input, OnChanges, OnInit, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { forkJoin, finalize } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StockService } from '../services/stock.service';
import { CompanyProfile, RecentStockSearchDetails, StockPriceDetails } from '../models/stocksmodels';
import { StockOpenAIRecommendation } from '../models/stocksmodels';
import { MatCardModule } from '@angular/material/card';
import { OpenAiRecommendationsService } from '../services/open-ai-recommendations.service';

@Component({
  selector: 'app-show-stock-details',
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './show-stock-details.component.html',
  styleUrl: './show-stock-details.component.css'
})
export class ShowStockDetailsComponent implements OnInit, OnChanges {
  aiRecommendation: StockOpenAIRecommendation | null = null;
  aiRecommendationTimestamp: Date | null = null;
  aiRecommendationLoading = false;
  selectedStock: any = null;
  selectStockSymbol = input<string>('');
  companyProfile!: CompanyProfile;
  stockPriceDetails!: StockPriceDetails;


  constructor(private stockService: StockService,
    private openAiRecommendationsService: OpenAiRecommendationsService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectStockSymbol'] && changes['selectStockSymbol'].currentValue) {
      const symbol = changes['selectStockSymbol'].currentValue;
      forkJoin({
        stockDetails: this.stockService.getStockDetails(symbol),
        companyProfile: this.stockService.getCompanyProfile(symbol)
      }).subscribe(({ stockDetails, companyProfile }) => {
        const recentSearchDetails: RecentStockSearchDetails = {
          stockSymbol: {
            symbol: symbol,
            description: '',
            displaySymbol: '',
            type: ''
          },
          priceDetails: stockDetails as StockPriceDetails,
          companyProfile: companyProfile as CompanyProfile
        };
        if (stockDetails) {
          this.stockPriceDetails = <StockPriceDetails>stockDetails;
          this.stockPriceDetails.lastUpdated = new Date();
          recentSearchDetails.priceDetails = this.stockPriceDetails;
        }
        if (companyProfile) {
          this.companyProfile = <CompanyProfile>companyProfile;
          recentSearchDetails.companyProfile = this.companyProfile;
        }
        this.persistRecentStocks(recentSearchDetails);
        this.fetchAIRecommendation(symbol);
      });
    }
  }

  fetchAIRecommendation(symbol: string): void {
    this.aiRecommendation = null;
    this.aiRecommendationTimestamp = null;
    this.aiRecommendationLoading = true;
    this.openAiRecommendationsService
      .getAIRecommendationsForStock(symbol)
      .pipe(finalize(() => (this.aiRecommendationLoading = false)))
      .subscribe({
        next: (recommendation) => {
          this.aiRecommendation = recommendation;
          this.aiRecommendationTimestamp = new Date();
        },
        error: () => {
          this.aiRecommendation = {
            symbol,
            recommendation: 'No recommendation available.',
            confidence: 0,
            reasoning: 'Failed to fetch AI recommendation.',
          };
          this.aiRecommendationTimestamp = new Date();
        },
      });
  }

  private persistRecentStocks(entry: RecentStockSearchDetails): void {
    const raw = localStorage.getItem('recentStocks');
    let list: RecentStockSearchDetails[] = [];
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed)) {
          list = parsed;
        } else if (parsed && typeof parsed === 'object' && 'stockSymbol' in parsed) {
          list = [parsed as RecentStockSearchDetails];
        }
      } catch {
        list = [];
      }
    }
    const symbol = entry.stockSymbol.symbol;
    list = list.filter((item) => item?.stockSymbol?.symbol !== symbol);
    list.unshift(entry);
    localStorage.setItem('recentStocks', JSON.stringify(list.slice(0, 5)));
  }

  getAIRecommendationForStock(): void {
    if (this.selectStockSymbol) {
      this.openAiRecommendationsService.getAIRecommendationsForStock(this.selectStockSymbol())
      .subscribe((recommendation) => {
        console.log(recommendation);
      });
    }
  }
}
