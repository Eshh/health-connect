import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppConfig } from 'src/app/app-config';
import { DataManager } from 'src/app/services/dataManager.service';
import { GeoLocationService } from 'src/app/services/geo-location.service';
import { Toaster } from 'src/app/utils/toast-util';

@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.css'],
})
export class HospitalListComponent implements OnInit {
  confirmationPopup!: ModalDirective;
  hospitals: any = [];
  searchHospitalsList: any = [];
  hospitalSearch: string = '';

  // pagination
  page: any = 0;
  pageSize: any = 10;
  tableSizes: any = [10, 20, 50, 100];
  totalCount: number = 0;

  showSpinner: boolean = false;
  constructor(
    private dataManager: DataManager,
    private toaster: Toaster,
    private router: Router,
    private geoLocation: GeoLocationService
  ) {}

  ngOnInit(): void {
    this.showSpinner = true;
    this.getHospitals();
    this.test();
  }
  triggerSubmit(hospital: any) {
    console.log(hospital);
    this.router.navigate([`hospital/${hospital.HospitalId}/book-consultation`]);
  }
  getHospitals() {
    this.dataManager
      .getHospitals(
        AppConfig.HOSPITAL_LIST + `?page=${this.page}&pageSize=${this.pageSize}`
      )
      .subscribe(
        (data) => {
          if (data.status) {
            this.hospitals = data.response[0].hospitals;
            this.searchHospitalsList = data.response[0].hospitals;
            this.totalCount = data.response[0].total;
            setTimeout(() => {
              this.showSpinner = false;
            }, 1000);
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

  searchHospitals() {
    if (this.hospitalSearch == '') {
      this.getHospitals();
    } else {
      this.searchHospitalsList = this.hospitals.filter((each: any) => {
        return each.HospitalName.toLowerCase().includes(
          this.hospitalSearch.toLowerCase()
        );
      });
    }
  }

  test() {
    // 51.53278270120654, 0.0526492961947593
    // 51.53292 , 0.05802;
    this.geoLocation.calculateDistanceBetweenCoordinates(
      51.53278270120654,
      0.0526492961947593,
      51.53292,
      0.05802
    );
  }
}
