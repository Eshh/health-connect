import { Injectable } from '@angular/core';
import { LocalStorageService } from './localStorage.service';
import { AppConfig } from '../app-config';
import { DataManager } from './dataManager.service';
import { Toaster } from '../utils/toast-util';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private localStorage: LocalStorageService,
    private dataManager: DataManager,
    private toaster: Toaster,
    private router: Router
  ) {}

  signIn(body: any) {
    this.dataManager.authorization(AppConfig.SIGN_IN_API, body).subscribe(
      (data) => {
        if (data.status) {
          this.localStorage.setData('user-data', data.response);
          this.localStorage.setItem('isLoggedIn', true);
          this.localStorage.setItem('token', data.token);
          this.router.navigate(['/dashboard']);
        } else {
          this.toaster.showToastMessage(data.errorMessage, '', 'error');
        }
      },
      (error) => {
        this.toaster.showToastMessage(
          'Please check the details provided',
          '',
          'error'
        );
      }
    );
  }

  signOut() {
    this.localStorage.deleteItem('user-data');
    this.localStorage.setItem('isLoggedIn', false);
    this.localStorage.setItem('token', null);
    this.router.navigate(['/sign-in']);
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    console.log('CanActivate called');
    let isLoggedIn = false;
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/sign-in']);
    }
  }
}
