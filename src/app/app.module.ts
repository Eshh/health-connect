import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './common/signin/signin.component';
import { SignupComponent } from './common/signup/signup.component';
import { ProfileComponent } from './common/profile/profile.component';
import { EditProfileComponent } from './common/profile/edit-profile/edit-profile.component';
import { ConsultationsComponent } from './common/consultations/consultations.component';
import { HospitalListComponent } from './user/hospital-list/hospital-list.component';
import { BookConsultationComponent } from './user/book-consultation/book-consultation.component';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { SlotChangeComponent } from './doctor/slot-change/slot-change.component';
import { PrescriptionsComponent } from './doctor/prescriptions/prescriptions.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    ProfileComponent,
    EditProfileComponent,
    ConsultationsComponent,
    HospitalListComponent,
    BookConsultationComponent,
    DashboardComponent,
    SlotChangeComponent,
    PrescriptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
