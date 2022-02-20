import { Component, OnInit } from '@angular/core';
import { MarketData } from './core/models/market-data.model';
import { RestApiService } from './core/services/rest-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'market-processor-FE';
  constructor(private restApiService: RestApiService) { }
  public marketDataList: MarketData[] = [];

  ngOnInit() {
    console.log('Calling message apis');
    this.getList();
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
}
