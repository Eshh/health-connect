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

  constructor(
    private dateUtil: DateUtils,
    private localStorage: LocalStorageService,
    private toaster: Toaster,
    private dataManager: DataManager
  ) {}

  ngOnInit(): void {
    this.getUpcomingThreedays();
    this.getDoctorSlots();
  }

  getSlots() {
    this.slotsArray = this.dateUtil.get24HourTimeSlots(60, 24);
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
    this.markSlots();
  }

  markSlots() {
    this.slotsArray.forEach((each: any) => {
      this.currentDoctor[0].Slots.forEach((eachInner: any) => {
        if (eachInner.StartTime == each.startValue) {
          each.isSelected = !each.isSelected;
        }
      });
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
    this.slotsArray.forEach((each: any) => {
      if (each.id == slot.id) {
        each['isSelected'] = !each.isSelected;
      }
    });
  }

  toggleDaySelection(day: any, i: number) {
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
              setTimeout(() => {
                this.getDoctorSlots();
                this.showSpinner = false;
              }, 1500);
            } else {
              this.toaster.showToastMessage(data.errorMessage, '', 'success');
            }
          },
          (error) => {}
        );
    }
  }
}
