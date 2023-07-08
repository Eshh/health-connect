import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/localStorage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  userType: string = '';
  constructor(private localStorage: LocalStorageService) {
    this.userType = this.localStorage.getData('user-data')[0].Role;
  }

  ngOnInit(): void {}
}
