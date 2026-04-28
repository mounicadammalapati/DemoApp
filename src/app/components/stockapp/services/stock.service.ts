import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { 
  }

  //api key : d7famg9r01qpjqqk46j0d7famg9r01qpjqqk46jg
   getStocks() {
    return this.http.get('api/stocks');
  }

  getSuggestions(query: string) {
    return this.http.get(`https://finnhub.io/api/v1/search?q=${query}&token=d7famg9r01qpjqqk46j0d7famg9r01qpjqqk46jg`);
  }

  getStockDetails(symbol: string) {
    return this.http.get('https://finnhub.io/api/v1/quote?symbol=AAPL&token=d7famg9r01qpjqqk46j0d7famg9r01qpjqqk46jg');
    //https://finnhub.io/api/v1/quote?symbol=AAPL&token=d7famg9r01qpjqqk46j0d7famg9r01qpjqqk46jg
  }
}
