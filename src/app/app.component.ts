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
  greeting: any;
  name: string | undefined;

  ngOnInit() {
    // this.shareDataService
    //   .currentMessage
    //   .subscribe(message => {
    //     this.greeting = message
    //     console.log(this.greeting);
    //   }); //<= Always get current value!

    console.log('Calling message apis at backend');
    this.getList();

    console.log("Connecting to web socket:");
    this.connect();
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

  connect() {
    this.websocketAPIService._connect();
  }

  disconnect() {
    this.websocketAPIService._disconnect();
  }

  handleMessage(message: any) {
    this.greeting = message;
  }
}