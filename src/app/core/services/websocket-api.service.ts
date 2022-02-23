import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { SharedDataService } from '../../shared/shared.data.service';


@Injectable({
  providedIn: 'root'
})
export class WebsocketApiService {
  webSocketEndPoint: string = 'http://localhost:8090/ws';
  topic: string = "/topic/messages";
  stompClient: any;

  constructor(private shareDataService: SharedDataService) {

  }

  _connect() {
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
  
    const _this = this;
    _this.stompClient.connect({}, function () {
      _this.stompClient.subscribe(_this.topic, function (recievedMessage: any) {
        _this.onMessageReceived(recievedMessage);
      });
      _this.stompClient.reconnect_delay = 5000;
    }, this.errorCallBack);
  };

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error: any) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
        this._connect();
    }, 5000);
  }

  onMessageReceived(message: any) {
    this.shareDataService.shareReceivedMessage(message.body);
  }
}