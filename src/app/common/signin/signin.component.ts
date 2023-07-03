import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AppConfig } from 'src/app/app-config';
import { DataManager } from 'src/app/services/dataManager.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { Toaster } from 'src/app/utils/toast-util';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signInForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    userType: new FormControl(),
  });
  constructor(
    private dataManager: DataManager,
    private locaStorage: LocalStorageService,
    private formBuilder: FormBuilder,
    private toaster: Toaster
  ) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      userType: ['', [Validators.required]],
    });
    this.toaster.showToastMessage('Success', '', 'success');
  }

  signIn() {
    if (this.signInForm.valid) {
      let body = {
        Email: this.signInForm.controls.email.value,
        Password: this.signInForm.controls.password.value,
        Role: this.signInForm.controls.userType.value,
      };
      this.dataManager
        .APIGenericPostMethod(AppConfig.SIGN_IN_API, body)
        .subscribe((data) => {
          this.locaStorage.setData('user-data', data);
          this.locaStorage.setItem('isLoggedIn', true);
          console.log(
            this.locaStorage.getData('user-data'),
            this.locaStorage.getItem('isLoggedIn')
          );
        });
    }
  }
}
