import { Injectable } from '@angular/core';
import { LocalStorageService } from './localStorage.service';
import { AppConfig } from '../app-config';
import { DataManager } from './dataManager.service';
import { Toaster } from '../utils/toast-util';
import { Router } from '@angular/router';

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
    this.dataManager
      .APIGenericPostMethod(AppConfig.SIGN_IN_API, body)
      .subscribe((data) => {
        if (data.status) {
          this.localStorage.setData('user-data', data);
          this.localStorage.setItem('isLoggedIn', true);
          this.router.navigate(['/dashboard']);
        } else {
          this.toaster.showToastMessage(data.errorMessage, '', 'Error');
        }
      });
  }

  signOut() {
    this.localStorage.deleteItem('user-data');
    this.localStorage.setItem('isLoggedIn', false);
    this.router.navigate(['/sign-in']);
  }
}
