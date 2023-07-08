import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class DateUtils {
  constructor() {}
  /*
   returns an array with time slots of specified interval in following format

   slot : {
     id:number,
     startKey:'4:00 PM',
     endKey:'4:30 PM',
     startValue: timestamp for startKey,
     endValue: timestamp for endKey,
    }

    interval in minutes can specify duration between slots eg. half an hour or one hour etc

    added by eshwar
  */
  get24HourTimeSlots(interval: number, slotNumber: number) {
    let tempArray = [];
    let time: any = new Date();
    for (let i = 0; i <= slotNumber; i++) {
      let slot: any = {};
      slot.id = i;
      slot.startKey = new Date(time).toLocaleString('en-US', {
        hour: '2-digit',
        minute: 'numeric',
        hour12: true,
      });
      slot.startValue = new Date(time).getTime();
      time = new Date(time).setHours(0, i * interval, 0, 0);
      slot.endKey = new Date(time).toLocaleString('en-US', {
        hour: '2-digit',
        minute: 'numeric',
        hour12: true,
      });
      slot.endValue = new Date(time).getTime();
      tempArray.push(slot);
    }
    tempArray.shift();
    return tempArray;
  }

  //  end of get slots function
}
