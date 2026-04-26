import { Component } from '@angular/core';
import { ShowStocksComponent } from './show-stocks/show-stocks.component';

@Component({
  selector: 'app-stockapp',
  imports: [ShowStocksComponent],
  templateUrl: './stockapp.component.html',
  styleUrl: './stockapp.component.css'
})
export class StockappComponent {

}
