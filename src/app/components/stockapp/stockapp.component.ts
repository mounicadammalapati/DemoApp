import { Component } from '@angular/core';
import { ShowStocksComponent } from './show-stocks/show-stocks.component';
import { RecentSearchComponent } from './recent-search/recent-search.component';

@Component({
  selector: 'app-stockapp',
  imports: [ShowStocksComponent,RecentSearchComponent],
  templateUrl: './stockapp.component.html',
  styleUrl: './stockapp.component.css'
})
export class StockappComponent {

}
