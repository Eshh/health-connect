import { Router, ActivatedRoute } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatpage',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css'],
})
export class ChatPageComponent implements OnInit {
   username:any='';
   email: any='';
   chatroom:any='';
   message: any='';
  consultationId:string=''
  messageArray: Array<{ user: String; message: String }> = [];
   isTyping = false;

  constructor(
    private route: ActivatedRoute,
    private webSocketService: WebsocketService,
    private router: Router,
    private activatedRoute:ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params:any)=>this.consultationId = params['consultationId'])
    this.webSocketService.newMessageReceived().subscribe((data) => {
      this.messageArray.push(data);
      this.isTyping = false;
    });
    this.webSocketService.receivedTyping().subscribe((bool) => {
      this.isTyping = bool.isTyping;
    });
  }

  ngOnInit() {
    this.chatroom = this.consultationId
    this.webSocketService.joinRoom({
      user: 'eshwar',
      _id: this.chatroom,
    });
    // this.userService.getChatRoomsChat(this.chatroom).subscribe((messages:any) => {
    //   this.messageArray = messages.json();
    // });
  }

  sendMessage() {
    this.webSocketService.sendMessage({
      _id: this.chatroom,
      user: 'eshwar',
      message: this.message,
    });
    // this.message = '';
  }

  typing() {
    this.webSocketService.typing({
      room: this.chatroom,
      user: 'eshwar',
    });
  }
}
