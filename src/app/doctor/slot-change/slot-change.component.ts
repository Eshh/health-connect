import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { DateUtils } from 'src/app/utils/date-utils';

@Component({
  selector: 'app-slot-change',
  templateUrl: './slot-change.component.html',
  styleUrls: ['./slot-change.component.css'],
})
export class SlotChangeComponent implements OnInit {
  slotsArray: any = [];
  daysArray: any = [];

  selectedDay: any = 0;

  constructor(
    private dateUtil: DateUtils,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.slotsArray = this.dateUtil.get24HourTimeSlots(60, 24);
    this.clearSlotSelection();
    this.getUpcomingThreedays();
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
  clearSlotSelection() {
    this.slotsArray.forEach((each: any) => {
      each['isSelected'] = false;
    });
  }
  toggleDaySelection(day: any, i: number) {
    this.clearSlotSelection();
    this.selectedDay = i;
  }
  postBodyGenerator() {
    let userData = this.localStorage.getData('user-data');
    let body = {
      Email: userData.Email,
      Id: userData._id,
    };
    let selectedDay = this.daysArray.filter(
      (each: any, i: number) => i == this.selectedDay
    );
  }

  slotsPostApi() {
    this.postBodyGenerator();
  }
}
