import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Custome imports
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
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { TopbarComponent } from './common/topbar/topbar.component';
import { WindowRef } from './services/window.service';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UpdatedPaginationComponent } from './utils/updated-pagination/updated-pagination.component';
import { PaginationModule, PaginationConfig } from 'ngx-bootstrap/pagination';

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
    PrescriptionsComponent,
    SidebarComponent,
    TopbarComponent,
    UpdatedPaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000, // 15 seconds
      progressBar: true,
      preventDuplicates: true,
      countDuplicates: false,
    }),
    ModalModule.forRoot(),
    PaginationModule,
  ],
  providers: [WindowRef],
  bootstrap: [AppComponent],
})
export class AppModule {}
