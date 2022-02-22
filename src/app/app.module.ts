import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WebsocketApiService } from './core/services/websocket-api.service';
import { RestApiService } from './core/services/rest-api.service';
import { SharedDataService } from './shared/shared.data.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    SharedDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
