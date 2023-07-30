import { Injectable } from '@angular/core';
import {io} from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket = io('https://health-connect-nq54.onrender.com/');
  constructor() {}

  joinRoom(data: any) {
    this.socket.emit('join', data);
  }

  sendMessage(data: any) {
    console.log(data)
    this.socket.emit('message', data);
  }

  newMessageReceived() {
    const observable = new Observable<{ user: String; message: String }>(
      (observer) => {
        this.socket.on('new message', (data: any) => {
          observer.next(data);
          console.log(data)
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
  }

  typing(data: any) {
    this.socket.emit('typing', data);
  }

  receivedTyping() {
    const observable = new Observable<{ isTyping: boolean }>((observer) => {
      this.socket.on('typing', (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
