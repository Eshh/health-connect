import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppConfig } from 'src/app/app-config';
import { DataManager } from 'src/app/services/dataManager.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { Toaster } from 'src/app/utils/toast-util';

@Component({
  selector: 'app-book-consultation',
  templateUrl: './book-consultation.component.html',
  styleUrls: ['./book-consultation.component.css'],
})
export class BookConsultationComponent implements OnInit {
  @ViewChild('confirmationPopup', { static: true })
  private confirmationPopup!: ModalDirective;
  doctorList: any = [];
  hospitalId: number = -1;
  hospital: any = {};
  selectedSlot: any = {};

  showSpinner: boolean = false;
  constructor(
    private dataManager: DataManager,
    private localStorage: LocalStorageService,
    private acticatedRoute: ActivatedRoute,
    private toaster: Toaster
  ) {
    this.showSpinner = true;
    this.acticatedRoute.params.subscribe((params) => {
      this.hospitalId = +params.hospitalId;
    });
  }

  ngOnInit(): void {
    this.getDoctorSlots();
    this.getHospitals();
  }

  getHospitals() {
    this.dataManager.getHospitals(AppConfig.HOSPITAL_LIST).subscribe(
      (data) => {
        if (data.status) {
          let hospitals = data.response[0].hospitals;
          this.hospital = hospitals.filter((each: any) => {
            return each.HospitalId == +this.hospitalId;
          });
          this.hospital = this.hospital[0];
        } else {
          this.toaster.showToastMessage(data.errorMessage, '', 'error');
        }
      },
      (error) => {}
    );
  }

  getDoctorSlots() {
    this.dataManager
      .APIGenericGetMethod(
        AppConfig.GET_HOSPITAL_DOCTORS + `id=${this.hospitalId}`
      )
      .subscribe(
        (data) => {
          if (data['status']) {
            this.doctorList = data.response[0].Doctors;
            setTimeout(() => {
              this.showSpinner = false;
            }, 1000);
          } else {
          }
        },
        (error) => {}
      );
  }

  triggerConsultation(doc: any, slot: any) {
    this.selectedSlot = {
      doc,
      slot,
      hospital: this.hospital,
    };
    this.confirmationPopup.show();
    console.log(this.selectedSlot);
  }

  bookConsultation() {}
}
