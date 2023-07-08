import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './common/signin/signin.component';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { SignupComponent } from './common/signup/signup.component';
import { HospitalListComponent } from './user/hospital-list/hospital-list.component';
import { ProfileComponent } from './common/profile/profile.component';
import { EditProfileComponent } from './common/profile/edit-profile/edit-profile.component';
import { SlotChangeComponent } from './doctor/slot-change/slot-change.component';
import { ConsultationsComponent } from './common/consultations/consultations.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
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
  },
  {
    path: 'hospitals',
    component: HospitalListComponent,
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    pathMatch: 'full',
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    pathMatch: 'full',
  },
  {
    path: 'assign-slots',
    component: SlotChangeComponent,
    pathMatch: 'full',
  },
  {
    path: 'consultations',
    component: ConsultationsComponent,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
