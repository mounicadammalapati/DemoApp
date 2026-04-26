import { Component, input, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-show-stock-details',
  imports: [],
  templateUrl: './show-stock-details.component.html',
  styleUrl: './show-stock-details.component.css'
})
export class ShowStockDetailsComponent implements OnInit, OnChanges {
  selectedStock: any = null;
  //selectStockSymbol= input<any> = '';

  // You can add methods here to fetch and display stock details based on the selected stock symbol
  constructor() { }




  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
   
  }


}
