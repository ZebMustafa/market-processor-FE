import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarketData } from '../models/market-data.model';
 // Define API
 const baseUrl = 'http://localhost:8090';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }
  
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  getAll(): Observable<MarketData[]> {
    return this.http.get<MarketData[]>(baseUrl+"/message-list");
  }
  
}
