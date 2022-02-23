import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedDataService } from './shared/shared.data.service';
import { AgChartsAngularModule } from 'ag-charts-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgChartsAngularModule
  ],
  providers: [
    SharedDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
