import { Component, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { StockService } from '../services/stock.service';
import { CommonModule } from '@angular/common';
import { StockPriceDetails } from '../models/stocksmodels';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-show-stock-details',
  imports: [CommonModule, MatTabsModule,MatCardModule],
  templateUrl: './show-stock-details.component.html',
  styleUrl: './show-stock-details.component.css'
})
export class ShowStockDetailsComponent implements OnInit, OnChanges {
  selectedStock: any = null;
  selectStockSymbol = input<string>('');
  stockPriceDetails!: StockPriceDetails;

  // You can add methods here to fetch and display stock details based on the selected stock symbol
  constructor(private stockService: StockService) { }


  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectStockSymbol'] && changes['selectStockSymbol'].currentValue) {
      this.fetchStockDetails(changes['selectStockSymbol'].currentValue);
    }
  }

  fetchStockDetails(symbol: string) {
    this.stockService.getStockDetails(symbol).subscribe((data) => {
      console.log('Stock details:', data);
      this.stockPriceDetails = <StockPriceDetails>data;
      //this.selectedStock = data;
    });
  }

  
}