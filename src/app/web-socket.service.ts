import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor(private socket: Socket) { }

  sendMessage(msg: string) {
    console.log("envia ->",msg);
    this.socket.emit('signal', msg);
  }

  getMessage() {
    return this.socket.fromEvent('signal').pipe(map((data:any) => data.msg));
  }

  listen(eventName: string){
    return new Observable((subscriber)=>{
      this.socket.on(eventName,(data: any)=>{
        subscriber.next(data);
      })
    })
  }


}
