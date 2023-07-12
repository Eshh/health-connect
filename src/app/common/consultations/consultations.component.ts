import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/app-config';
import { DataManager } from 'src/app/services/dataManager.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { Toaster } from 'src/app/utils/toast-util';

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.css'],
})
export class ConsultationsComponent implements OnInit {
  consultations: any = [];
  userData: any = {};
  userType: string = '';

  // pagination
  page: any = 0;
  pageSize: any = 10;
  tableSizes: any = [10, 20, 50, 100];
  totalCount: number = 0;

  constructor(
    private dataManager: DataManager,
    private toaster: Toaster,
    private localStorage: LocalStorageService,
    private router: Router
  ) {
    this.userData = this.localStorage.getData('user-data')[0];
    this.userType = this.userData.Role;
  }

  ngOnInit(): void {
    this.getConsultations();
  }

  getConsultations() {
    let url =
      this.userData.Role == 'doctor'
        ? AppConfig.LIST_CONSULTATIONS_DOCTOR
        : AppConfig.LIST_CONSULTATIONS_USER;
    this.dataManager
      .APIGenericGetMethod(
        url +
          `Email=${this.userData.Email}&page=${this.page}&pageSize=${this.pageSize}`
      )
      .subscribe((data) => {
        if (data['status']) {
          this.consultations = data.response;
          this.totalCount = data.total;
        }
      });
  }

  // pagination related block, this goes to updated pagination component
  getPaginationData(data: any) {
    this.page = data.page;
    this.pageSize = data.pageSize;
    this.getConsultations();
  } // ends of function

  goToPrescriptions(type: string) {
    this.router.navigate([`${type}/prescription`]);
  }
}
