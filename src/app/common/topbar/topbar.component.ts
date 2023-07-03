import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {
  userData: any = {};
  constructor(
    private auth: AuthService,
    private localStorage: LocalStorageService
  ) {
    this.userData = this.localStorage.getData('user-data')[0];
  }

  ngOnInit(): void {}

  logOut() {
    this.auth.signOut();
  }
}
