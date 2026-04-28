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
}