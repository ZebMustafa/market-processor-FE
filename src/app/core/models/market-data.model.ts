export interface MarketData {
    id: number;
    currencyFrom: string;
    currencyTo: string;
    amountSell: number;
    amountBuy:number;
    rate: number;
    timePlaced: Date;
    userId:number;
 }