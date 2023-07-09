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
  userData: any = {};

  showSpinner: boolean = false;
  constructor(
    private dataManager: DataManager,
    private localStorage: LocalStorageService,
    private acticatedRoute: ActivatedRoute,
    private toaster: Toaster
  ) {
    this.userData = this.localStorage.getData('user-data')[0];
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
  }

  postBodyGenerator() {
    console.log(this.selectedSlot, this.userData);
    let body: any = {
      User: {
        _id: this.userData._id,
        Email: this.userData.Email,
      },
      Doctor: {
        _id: this.selectedSlot.doc._id,
        Email: this.selectedSlot.doc.Email,
      },
      Hospital: {
        HospitalId: this.selectedSlot.hospital.HospitalId,
      },
      Slot: {
        StartTime: this.selectedSlot.slot.StartTime,
        EndTime: this.selectedSlot.slot.EndTime,
      },
    };
    console.log(body);
    return body;
  }
  bookConsultation() {
    this.showSpinner = true;
    let body = this.postBodyGenerator();
    // return;
    this.dataManager
      .APIGenericPostMethod(AppConfig.BOOK_CONSULTATION, body)
      .subscribe(
        (data) => {
          if (data['status']) {
            this.toaster.showToastMessage(
              'consultation booked successfully',
              '',
              'success'
            );
            this.confirmationPopup.hide();
            // this.router.navigate(['consultations'])
          } else {
            this.toaster.showToastMessage(data.errorMessage, '', 'errro');
          }
        },
        (error) => {}
      );
    setTimeout(() => {
      this.showSpinner = false;
    }, 1500);
  }
}
