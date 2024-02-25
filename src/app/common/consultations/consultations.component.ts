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
  filteredConsultations: any = [];
  userData: any = {};
  userType: string = '';
  statusFilter: any = 'all';
  statusOptions: any = [
    { name: 'All', key: 'all' },
    { name: 'Active', key: 'active' },
    { name: 'Upcoming', key: 'upcoming' },
    { name: 'Completed', key: 'completed' },
  ];

  // pagination
  page: any = 0;
  pageSize: any = 10;
  tableSizes: any = [10, 20, 50, 100];
  totalCount: number = 0;
  showSpinner: boolean = false;

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
    this.showSpinner = true;
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
          this.statusFilter = 'all';
          this.consultations = data.response;
          this.consultations.forEach((each: any) => {
            each['status'] = this.resolveStatus(each.BookedSlot);
            console.log(each)

          });
          this.filteredConsultations = this.consultations;
          this.filteredConsultations = this.filteredConsultations.sort(
            (a: any, b: any) => b.BookedSlot.StartTime - a.BookedSlot.StartTime
          );
          this.totalCount = data.total;
        }
      });
    setTimeout(() => {
      this.showSpinner = false;
    }, 1500);
  }

  filterData() {
    this.filteredConsultations = this.consultations;
    this.filteredConsultations = this.filteredConsultations.filter(
      (each: any) => {
        if (this.statusFilter != 'all') {
          console.log(each)
          return each.status == this.statusFilter;
        } else {
          return true;
        }
      }
    );
  }

  resolveStatus(date: any) {
    let status = 'upcoming';
    let { EndTime, StartTime } = date;
    let now = new Date().getTime();
    if (now > EndTime) {
      status = 'completed';
    } else if (EndTime > now && now > StartTime) {
      status = 'active';
    }

    return status;
  }

  // pagination related block, this goes to updated pagination component
  getPaginationData(data: any) {
    this.page = data.page;
    this.pageSize = data.pageSize;
    this.getConsultations();
  } // ends of function

  goToPrescriptions(type: string, consultation: any) {
    this.router.navigate([`${consultation._id}/prescription`]);
  }

  goToChat(consultation: any) {
    console.log(consultation);
    this.router.navigate([`/chat-room/${consultation._id}`]);
  }
}
