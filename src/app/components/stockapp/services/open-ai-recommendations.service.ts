import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StockOpenAIRecommendation } from '../models/stocksmodels';

/**
 * Calls Azure Functions via same-origin `/api/...` so `ng serve` can proxy to localhost:7006
 * (see `proxy.conf.json`) and avoid browser CORS.
 */
@Injectable({
  providedIn: 'root',
})
export class OpenAiRecommendationsService {
  constructor(private http: HttpClient) {}

  getAIRecommendationsForStock(stockSymbol: string) {
    return this.http.get<StockOpenAIRecommendation>(`https://openaistockrecommendationapi20260509170412.azurewebsites.net/api/function1?symbol=${stockSymbol}`);
  }
}
