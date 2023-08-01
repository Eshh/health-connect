import { Router, ActivatedRoute } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';
import { Component, OnInit } from '@angular/core';
import { DataManager } from 'src/app/services/dataManager.service';
import { AppConfig } from 'src/app/app-config';
import { LocalStorageService } from 'src/app/services/localStorage.service';

@Component({
  selector: 'app-chatpage',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css'],
})
export class ChatPageComponent implements OnInit {
  message: any = '';
  consultationId: string = '';
  messageArray: any = [];
  isTyping = false;
  userData: any = {};
  consultationDetails: any = {};

  constructor(
    private localStorage: LocalStorageService,
    private webSocketService: WebsocketService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataManager: DataManager
  ) {
    this.activatedRoute.params.subscribe(
      (params: any) => (this.consultationId = params['consultationId'])
    );
    this.userData = this.localStorage.getData('user-data')[0];

    this.webSocketService.newMessageReceived().subscribe((data: any) => {
      this.messageArray.push(data);
      this.formatMessages();
      this.isTyping = false;
    });
    this.webSocketService.receivedTyping().subscribe((bool) => {
      this.isTyping = bool.isTyping;
    });
  }

  ngOnInit() {
    this.getConsultations();
    this.webSocketService.joinRoom({
      _id: this.consultationId,
    });
    this.getChatRoomsChat(this.consultationId);
  }

  getConsultations() {
    let url =
      this.userData.Role == 'doctor'
        ? AppConfig.LIST_CONSULTATIONS_DOCTOR
        : AppConfig.LIST_CONSULTATIONS_USER;
    this.dataManager
      .APIGenericGetMethod(url + `Email=${this.userData.Email}`)
      .subscribe((data) => {
        if (data['status']) {
          this.consultationDetails = data.response.filter(
            (each: any) => each._id == this.consultationId
          )[0];
        }
      });
  }

  getChatRoomsChat(room: any) {
    this.dataManager
      .getHospitals(AppConfig.GET_CHAT_MESSAGES + room)
      .subscribe((data) => {
        this.messageArray = data.messages;
        this.formatMessages();
      });
  }

  formatMessages() {
    this.messageArray.forEach((each: any) => {
      each['type'] = 'received';
      if (each.user == this.userData.Name) {
        each['type'] = 'sent';
      }
    });
  }

  sendMessage() {
    if (this.message != '') {
      this.webSocketService.sendMessage({
        _id: this.consultationId,
        info: { user: this.userData.Name, time: new Date().getTime() },
        message: this.message,
      });
      this.message = '';
    }
  }

  typing(e: any) {
    if (e.key == 'Enter') {
      this.sendMessage();
      return;
    }
    this.webSocketService.typing({
      room: this.consultationId,
    });
  }
}
