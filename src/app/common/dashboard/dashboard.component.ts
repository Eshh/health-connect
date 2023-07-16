import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/localStorage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userData: any = {};
  showSpinner: boolean = false;
  greet: any = '';
  constructor(private localStorage: LocalStorageService) {
    this.userData = this.localStorage.getData('user-data')[0];
  }

  ngOnInit(): void {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 1500);
  }
  setGreetingMessage() {
    let myDate = new Date();
    let hrs = myDate.getHours();
    if (hrs < 12) this.greet = 'Good Morning';
    else if (hrs >= 12 && hrs < 17) this.greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs < 24) this.greet = 'Good Evening';
  }
}
