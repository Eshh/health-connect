import { Component,OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Subscription } from 'rxjs';
import { timer } from 'rxjs';
import { map,share } from 'rxjs/operators'

@Component({
  selector: 'clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit{
  rxTime = new Date();
  intervalId:any;
  subscription?: Subscription;

  ngOnInit() {
    // Using RxJS Timer
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        this.rxTime = time;
      });
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
