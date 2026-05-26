export class StockSymbolResults{
  count!: number;
  result!: StockSymbol[];
}

export class StockSymbol {
  description!: string;
  displaySymbol!: string;
  symbol!: string;
  type!: string;
}

export class StockPriceDetails{
  c!: number; // Current price
  h!: number; // High price of the day
  l!: number; // Low price of the day
  o!: number; // Open price of the day
  pc!: number; // Previous close price
  lastUpdated!:Date;
}

export class RecentStockSearchDetails {
  stockSymbol!: StockSymbol;
  priceDetails!: StockPriceDetails;
  companyProfile!: CompanyProfile;
}


export class CompanyProfile {
  country!: string;
  currency!: string;
  estimateCurrency!: string;
  exchange!: string;
  finnhubIndustry!: string;
  ipo!: string;
  logo!: string;
  marketCapitalization!: number;
  name!: string;
  phone!: string;
  shareOutstanding!: number;
  ticker!: string;
  weburl!: string;
}

export class StockOpenAIRecommendation{
  symbol!: string;
  recommendation!: string;
  confidence!: number;
  reasoning!: string;
}