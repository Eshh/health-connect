import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/app-config';
import { AuthService } from 'src/app/services/auth.service';
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

  passwordType: string = 'text';
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private toaster: Toaster,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      userType: ['user', [Validators.required]],
    });
  }

  signIn() {
    if (this.signInForm.valid) {
      let body = {
        Email: this.signInForm.controls.email.value,
        Password: +this.signInForm.controls.password.value,
        Role: this.signInForm.controls.userType.value,
      };
      this.auth.signIn(body);
    }
  }
}
