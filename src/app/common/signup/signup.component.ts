import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/app-config';
import { DataManager } from 'src/app/services/dataManager.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { Toaster } from 'src/app/utils/toast-util';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  isDoctor: boolean = false;
  signupFormBasic = new FormGroup({
    name: new FormControl(),
    gender: new FormControl(),
    dob: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    address: new FormControl(),
    // postcode: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
  });
  signupFormDoctor = new FormGroup({
    qualification: new FormControl(),
    experience: new FormControl(),
    specialization: new FormControl(),
    hospital: new FormControl(),
  });

  hospitals: any = [];
  showSpinner: boolean = false;
  confirmationBlock: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private toaster: Toaster,
    private dataManager: DataManager,
    private router: Router,
    private localStorage: LocalStorageService
  ) {
    if (this.localStorage.getItem('isLoggedIn') == 'true') {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit(): void {
    this.initaiteForms('basic');
  }

  initaiteForms(param: string) {
    if (param == 'basic') {
      this.signupFormBasic = this.formBuilder.group({
        name: ['', [Validators.required]],
        gender: ['', [Validators.required, Validators.minLength(3)]],
        dob: [
          formatDate(new Date('01-01-2000'), 'yyyy-MM-dd', 'en'),
          [Validators.required],
        ],
        email: ['', [Validators.required, Validators.email]],
        phone: [
          '',
          [
            Validators.required,
            this.validateInput(),
            // Validators.minLength(3),
            // Validators.maxLength(15),
          ],
        ],
        address: ['', [Validators.required]],
        // postcode: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      });
    } else {
      this.signupFormDoctor = this.formBuilder.group({
        qualification: ['', [Validators.required]],
        experience: ['', [Validators.required]],
        specialization: ['', [Validators.required]],
        hospital: ['', [Validators.required]],
      });
      this.getHospitals();
    }
  }

  buildDoctorForm() {
    this.confirmationBlock = false;
    if (this.isDoctor) {
      this.initaiteForms('doctor');
    }
  }

  resolveDisability() {
    let condition = this.signupFormBasic.valid;
    if (this.isDoctor) {
      condition = this.signupFormBasic.valid && this.signupFormDoctor.valid;
    }
    return condition;
  }

  signUp() {
    let fB = this.signupFormBasic.controls;
    let fD = this.signupFormDoctor.controls;
    if (fB.password.value != fB.confirmPassword.value) {
      this.toaster.showToastMessage("Passwords don't match", '', 'error');
    } else {
      let body: any = {
        Name: fB.name.value,
        Gender: fB.gender.value,
        DOB: new Date(fB.dob.value).getTime(),
        Email: fB.email.value,
        Mobile: fB.phone.value,
        Address: fB.address.value,
        Postcode: '',
        Password: fB.password.value,
        Role: 'user',
        Location: [],
      };
      if (this.isDoctor) {
        body['Qualification'] = fD.qualification.value;
        body['Experience'] = +fD.experience.value;
        body['Specalization'] = fD.specialization.value;
        body['HospitalId'] = +fD.hospital.value;
        body.Role = 'doctor';
      }
      let url = this.isDoctor
        ? AppConfig.SIGN_UP_API_DOCTOR
        : AppConfig.SIGN_UP_API_USER;
      this.dataManager.authorization(url, body).subscribe((data) => {
        if (data.status) {
          this.toaster.showToastMessage(
            'Successfully signed up',
            '',
            'success'
          );
          setTimeout(() => {
            this.router.navigate(['/sign-in']);
          }, 2000);
        } else {
          this.toaster.showToastMessage(data.errorMessage, '', 'error');
        }
      });
    }
  }

  getHospitals() {
    this.dataManager.getHospitals(AppConfig.HOSPITAL_LIST).subscribe(
      (data) => {
        if (data.status) {
          this.hospitals = data.response[0].hospitals;
          setTimeout(() => {
            this.showSpinner = false;
          }, 1000);
        } else {
          this.toaster.showToastMessage(data.errorMessage, '', 'error');
        }
      },
      (error) => {}
    );
  }

  validateInput() {
    return (control: any) => {
      console.log(control.value);
      let v = String(control.value);
      if (v.length < 8 || v.length > 14) {
        return { lenthError: true };
      }
      return null;
    };
  }
}
