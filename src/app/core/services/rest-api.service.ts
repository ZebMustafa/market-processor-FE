import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarketData } from '../models/market-data.model';
// Define API
const baseUrl = 'http://localhost:8090';

const messageListAPI = "/message-list";
const exchangePairAPI = "/message-exhange-pair";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  getAll(): Observable<MarketData[]> {
    return this.http.get<MarketData[]>(baseUrl + messageListAPI);
  }

  getExchangePairData(): Observable<MarketData[]> {
    const currencyFrom = "EUR";
    const currencyTo = "USD";

    let queryParams = new HttpParams()
      .append("currencyFrom", currencyFrom)
      .append("currencyTo", currencyTo);

    return this.http.get<MarketData[]>(baseUrl + exchangePairAPI, { params: queryParams });
  }
}
