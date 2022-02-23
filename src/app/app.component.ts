import { Component, OnInit } from '@angular/core';
import { MarketData } from './core/models/market-data.model';
import { SharedDataService } from './shared/shared.data.service';
import { RestApiService } from './core/services/rest-api.service';
import { WebsocketApiService } from './core/services/websocket-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'market-processor-FE';
  constructor(
    private restApiService: RestApiService,
    private websocketAPIService: WebsocketApiService,
    private shareDataService: SharedDataService) {
    this.websocketAPIService = new WebsocketApiService(this.shareDataService);
  }
  public marketDataList: MarketData[] = [];
  exchangePairModel: any;
  message: any;
  name: string | undefined;
  public options: any;
  data = []

  ngOnInit() {

    this.subscibeToSharedService();
    this.options = {
      data: this.data,
      series: [{
        xKey: 'timePlaced',
        yKey: 'rate',
      }],
    };

    this.getList();

    this.getExchangePairData();

    this.connect();
  }
  
  subscibeToSharedService() {

    this.shareDataService
      .currentMessage
      .subscribe(message => {
        this.handleMessage(message);
        this.getExchangePairData();
      });
  }

  getList(): void {

    this.restApiService.getAll()
      .subscribe({
        next: (data) => {
          console.log(data);
          this.marketDataList = data;
        },
        error: (e) => console.error(e)
      });
  }

  getExchangePairData() {
    this.restApiService.getExchangePairData()
      .subscribe({
        next: (data) => {
          this.exchangePairModel = data;
          this.options = {
            data: this.exchangePairModel.exchangeRateList
          }
        },
        error: (e) => console.error(e)
      });
  }

  connect() {
    this.websocketAPIService._connect();
  }

  disconnect() {
    this.websocketAPIService._disconnect();
  }

  handleMessage(message: any) {
    if (Object.keys(message).length != 0) {
      this.message = JSON.parse(message);
      this.marketDataList.push(this.message);
    }
  }
}