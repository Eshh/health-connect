import { Component, OnInit } from '@angular/core';
import { Toaster } from 'src/app/utils/toast-util';
import { AppConfig } from 'src/app/app-config';
import { DataManager } from 'src/app/services/dataManager.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userData: any = {};
  hospital: any = [];
  showSpinner: boolean = false;
  constructor(
    private localStorage: LocalStorageService,
    private dataManager: DataManager,
    private toaster: Toaster
  ) {
    this.userData = JSON.parse(this.localStorage.getItem('user-data'))[0];
  }

  ngOnInit(): void {
    this.getHospitals();
  }

  getHospitals() {
    this.dataManager.getHospitals(AppConfig.HOSPITAL_LIST).subscribe(
      (data) => {
        if (data.status) {
          this.hospital = data.response[0].hospitals.filter((each: any) => {
            return each.HospitalId == this.userData.HospitalId;
          });
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
}
