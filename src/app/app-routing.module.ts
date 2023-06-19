import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './common/signin/signin.component';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { SignupComponent } from './common/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    component: SigninComponent,
  },
  {
    path: 'sign-up',
    component: SignupComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
