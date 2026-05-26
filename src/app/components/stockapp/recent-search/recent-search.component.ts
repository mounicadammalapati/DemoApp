import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RecentStockSearchDetails } from '../models/stocksmodels';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-recent-search',
  imports: [MatCardModule, CommonModule, ReactiveFormsModule,MatIconModule,MatButtonModule],
  templateUrl: './recent-search.component.html',
  styleUrl: './recent-search.component.css',
})
export class RecentSearchComponent implements OnInit {
  recentSearchStockInfo: RecentStockSearchDetails[] = [];
  private readonly platformId = inject(PLATFORM_ID);

  constructor(private stockService: StockService) {}  
  

  ngOnInit(): void {
    //do subscriber to signal if there is any change in the local storage and update the recent search list accordingly
      const recentStocks = localStorage.getItem('recentStocks');
      if (recentStocks) {
        this.recentSearchStockInfo = JSON.parse(recentStocks);
      }
  }

  clearRecentSearches(){
    localStorage.removeItem('recentStocks');
    this.recentSearchStockInfo = [];
  }

  refreshRecentSearches(){
    const recentStocks = localStorage.getItem('recentStocks');
    if (recentStocks) {
      this.recentSearchStockInfo = JSON.parse(recentStocks);
      this.recentSearchStockInfo.forEach(stock => {
        if(stock.stockSymbol && stock.stockSymbol.symbol){
          this.getRefreshedStockDetails(stock.stockSymbol.symbol);
        }
      });
    } else {
      this.recentSearchStockInfo = [];
    }
  }

  getRefreshedStockDetails(symbol: string): void {
      //fetch the latest stock details and update the local storage with the new details
      this.stockService.getStockDetails


  }

}
