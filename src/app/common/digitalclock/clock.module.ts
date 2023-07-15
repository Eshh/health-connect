import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DateRoutingModule } from './clock-routing.module';
import { ClockComponent } from './clock.component';

@NgModule({
  declarations: [
    ClockComponent
  ],
  imports: [
    BrowserModule,
    DateRoutingModule
  ],
  providers: [],
  bootstrap: [ClockComponent]
})
export class AppModule { }
