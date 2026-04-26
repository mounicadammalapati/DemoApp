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