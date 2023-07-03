import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/app-config';
import { DataManager } from 'src/app/services/dataManager.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(private dataManager: DataManager) {}

  ngOnInit(): void {
    this.signIn();
  }

  signIn() {
    let body = {
      Email: 'krishna@mail.com',
      Password: 123456,
      Role: 'user',
    };
    this.dataManager
      .APIGenericPostMethod(AppConfig.SIGN_IN_API, body)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
