import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './common/signin/signin.component';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { SignupComponent } from './common/signup/signup.component';
import { HospitalListComponent } from './user/hospital-list/hospital-list.component';
import { ProfileComponent } from './common/profile/profile.component';
import { EditProfileComponent } from './common/profile/edit-profile/edit-profile.component';
import { SlotChangeComponent } from './doctor/slot-change/slot-change.component';
import { ConsultationsComponent } from './common/consultations/consultations.component';

// Route guard
import { AuthGuard } from './services/route.guard';
import { LocalStorageService } from './services/localStorage.service';
import { BookConsultationComponent } from './user/book-consultation/book-consultation.component';
import { PrescriptionsComponent } from './common/prescriptions/prescriptions.component';
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sign-in',
    component: SigninComponent,
    pathMatch: 'full',
  },
  {
    path: 'sign-up',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'hospitals',
    component: HospitalListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'assign-slots',
    component: SlotChangeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'consultations',
    component: ConsultationsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: ':consultationId/prescription',
    component: PrescriptionsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },

  {
    path: 'hospital/:hospitalId/book-consultation',
    component: BookConsultationComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) {
    if (this.localStorage.getItem('isLoggedIn') == 'true') {
    } else {
      this.router.navigate(['sign-in']);
    }
  }
}
