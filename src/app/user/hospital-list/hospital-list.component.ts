import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/app-config';
import { DataManager } from 'src/app/services/dataManager.service';
import { Toaster } from 'src/app/utils/toast-util';

@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.css'],
})
export class HospitalListComponent implements OnInit {
  hospitals: any = [];

  // pagination
  page: any = 0;
  pageSize: any = 10;
  tableSizes: any = [10, 20, 50, 100];

  constructor(private dataManager: DataManager, private toaster: Toaster) {}

  ngOnInit(): void {
    this.getHospitals();
  }

  getHospitals() {
    this.dataManager.APIGenericGetMethod(AppConfig.HOSPITAL_LIST).subscribe(
      (data) => {
        if (data.status) {
          this.hospitals = data.response[0].hospitals;
        } else {
          this.toaster.showToastMessage(data.errorMessage, '', 'error');
        }
      },
      (error) => {}
    );
  }

  // pagination related block, this goes to updated pagination component
  getPaginationData(data: any) {
    this.page = data.page;
    this.pageSize = data.pageSize;
    this.getHospitals();
  } // ends of function
}
