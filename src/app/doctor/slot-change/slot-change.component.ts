import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/app-config';
import { DataManager } from 'src/app/services/dataManager.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { DateUtils } from 'src/app/utils/date-utils';
import { Toaster } from 'src/app/utils/toast-util';

@Component({
  selector: 'app-slot-change',
  templateUrl: './slot-change.component.html',
  styleUrls: ['./slot-change.component.css'],
})
export class SlotChangeComponent implements OnInit {
  slotsArray: any = [];
  daysArray: any = [];
  currentDoctor: any = {};

  selectedDay: any = 0;
  showSpinner: boolean = false;

  consultations: any = [];
  userData: any = {};
  userType: string = '';

  constructor(
    private dateUtil: DateUtils,
    private localStorage: LocalStorageService,
    private toaster: Toaster,
    private dataManager: DataManager
  ) {
    this.userData = this.localStorage.getData('user-data')[0];
    this.userType = this.userData.Role;
  }

  ngOnInit(): void {
    this.getUpcomingThreedays();
    this.getDoctorSlots();
  }

  getConsultations() {
    let url =
      this.userData.Role == 'doctor'
        ? AppConfig.LIST_CONSULTATIONS_DOCTOR
        : AppConfig.LIST_CONSULTATIONS_USER;
    this.dataManager
      .APIGenericGetMethod(url + `Email=${this.userData.Email}`)
      .subscribe((data) => {
        if (data['status']) {
          this.consultations = data.response;
          this.disableBookedSlots();
        }
      });
  }

  getSlots() {
    this.slotsArray = this.dateUtil.get24HourTimeSlots(60, 23);
    this.clearSlotSelection();
  }
  clearSlotSelection() {
    this.slotsArray.forEach((each: any) => {
      each['isSelected'] = false;
    });
    this.updateSlotsWithCurrentDay();
  }

  updateSlotsWithCurrentDay() {
    let selectedDay = this.daysArray.filter(
      (each: any, i: number) => i == this.selectedDay
    );
    selectedDay = selectedDay[0];
    this.slotsArray.forEach((each: any) => {
      let s = new Date(each.startValue);
      s.setDate(new Date(selectedDay).getDate());
      let e = new Date(each.endValue);
      e.setDate(new Date(selectedDay).getDate());
      each.startValue = new Date(s).getTime();
      each.endValue = new Date(e).getTime();
    });
    this.slotsArray = this.slotsArray.filter(
      (each: any) => each.startValue > new Date().getTime()
    );
    this.markSlots();
  }

  markSlots() {
    if (!!this.currentDoctor[0]?.Slots) {
      this.slotsArray.forEach((each: any) => {
        this.currentDoctor[0].Slots.forEach((eachInner: any) => {
          if (eachInner.StartTime == each.startValue) {
            each.isSelected = true;
          }
        });
      });
    }
    this.getConsultations();
  }
  disableBookedSlots() {
    let bookedSlots: any = [];
    this.consultations.forEach((each: any) => {
      bookedSlots.push(each.BookedSlot.StartTime);
    });
    this.slotsArray.forEach((each: any) => {
      if (bookedSlots.includes(each.startValue)) {
        each.isSelected = false;
        each['isBooked'] = true;
      } else {
        each['isBooked'] = false;
      }
    });
  }
  getDoctorSlots() {
    this.dataManager
      .APIGenericGetMethod(
        AppConfig.GET_HOSPITAL_DOCTORS +
          `id=${this.localStorage.getData('user-data')[0].HospitalId}`
          
      )
      .subscribe(
        (data) => {
          if (data['status']) {
            this.currentDoctor = data.response[0].Doctors.filter(
              (each: any) => {
                return (
                  each._id == this.localStorage.getData('user-data')[0]?._id
                );
              }
            );
            this.getSlots();
          } else {
          }
        },
        (error) => {}
      );
  }

  getUpcomingThreedays() {
    this.daysArray = [
      new Date().setDate(new Date().getDate()),
      new Date().setDate(new Date().getDate() + 1),
      new Date().setDate(new Date().getDate() + 2),
      new Date().setDate(new Date().getDate() + 3),
    ];
  } // end of  getUpcomingThreedays function

  toggleSlotSelection(slot: any) {
    if (!slot.isBooked) {
      this.slotsArray.forEach((each: any) => {
        if (each.id == slot.id) {
          each['isSelected'] = !each.isSelected;
        }
      });
    }
  }

  toggleDaySelection(day: any, i: number) {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 1000);
    this.selectedDay = i;
    this.getSlots();
  }
  postBodyGenerator() {
    let userData = this.localStorage.getData('user-data')[0];
    let body = {
      Email: userData.Email,
      _id: userData._id,
      Slots: this.generateSlots(),
    };
    return body;
  }
  generateSlots() {
    let slots: any = [];
    let selectedDay = this.daysArray.filter(
      (each: any, i: number) => i == this.selectedDay
    );
    selectedDay = selectedDay[0];
    let selectedSlots = this.slotsArray.filter((each: any) => {
      return each.isSelected == true;
    });
    if (selectedSlots.length == 0) {
      this.toaster.showToastMessage(
        'Please select 1 slot atleast',
        '',
        'error'
      );
    } else {
      selectedSlots.forEach((each: any) => {
        let s = new Date(each.startValue);
        s.setDate(new Date(selectedDay).getDate());
        let e = new Date(each.endValue);
        e.setDate(new Date(selectedDay).getDate());
        slots.push({
          StartTime: new Date(s).getTime(),
          EndTime: new Date(e).getTime(),
        });
      });
    }
    return slots;
  }

  slotsPostApi() {
    this.showSpinner = true;
    let apiBody = this.postBodyGenerator();
    if (apiBody.Slots.length != 0) {
      this.dataManager
        .APIGenericPostMethod(AppConfig.SLOTS_API, apiBody)
        .subscribe(
          (data) => {
            if (data['status']) {
              this.toaster.showToastMessage(
                'Successfully marked available slots',
                '',
                'success'
              );
            } else {
              this.toaster.showToastMessage(data.errorMessage, '', 'success');
            }
          },
          (error) => {}
        );
    }
    setTimeout(() => {
      this.getDoctorSlots();
      this.showSpinner = false;
    }, 1500);
  }
}
