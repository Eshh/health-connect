import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/localStorage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userData: any = {};
  constructor(private localStorage: LocalStorageService) {
    this.userData = JSON.parse(this.localStorage.getItem('user-data'))[0];
    console.log(this.userData);
  }

  ngOnInit(): void {}
}
