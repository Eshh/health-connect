import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppConfig } from 'src/app/app-config';
import { AuthService } from 'src/app/services/auth.service';
import { DataManager } from 'src/app/services/dataManager.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { Toaster } from 'src/app/utils/toast-util';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  userData: any = {};
  hospitals: any = [];

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

  showSpinner: boolean = false;
  constructor(
    private localStorage: LocalStorageService,
    private formBuilder: FormBuilder,
    private dataManager: DataManager,
    private toaster: Toaster,
    private router: Router,
    private authService: AuthService
  ) {
    this.userData = this.localStorage.getData('user-data')[0];
  }

  ngOnInit(): void {
    this.toaster.showToastMessage(
      'You will have to signin again If profile is updated',
      '',
      'eeee'
    );
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 1500);
    this.initaiteForms('basic');
    if (this.userData.Role == 'doctor') {
      this.isDoctor = true;
      this.buildDoctorForm();
    }
  }

  initaiteForms(param: string) {
    let d = this.userData;
    if (param == 'basic') {
      this.signupFormBasic = this.formBuilder.group({
        name: [d.Name, [Validators.required]],
        gender: [d.Gender, [Validators.required, Validators.minLength(3)]],
        dob: [
          formatDate(new Date(d.DOB), 'yyyy-MM-dd', 'en'),
          [Validators.required],
        ],
        email: [d.Email, [Validators.required, Validators.email]],
        phone: [d.Mobile, [Validators.required, Validators.minLength(3)]],
        address: [d.Address, [Validators.required]],
        // postcode: [d.Postcode, [Validators.required]],
        password: ['', []],
        confirmPassword: ['', []],
      });
    } else {
      this.signupFormDoctor = this.formBuilder.group({
        qualification: [d.Qualification, [Validators.required]],
        experience: [d.Experience, [Validators.required]],
        specialization: [d.Specalization, [Validators.required]],
        hospital: ['', [Validators.required]],
      });
      this.getHospitals();
    }
  }

  buildDoctorForm() {
    this.initaiteForms('doctor');
  }
  resolveDisability() {
    let condition = this.signupFormBasic.valid;
    if (this.isDoctor) {
      condition = this.signupFormBasic.valid && this.signupFormDoctor.valid;
    }
    return condition;
  }

  signUp() {
    this.showSpinner = true;
    let fB = this.signupFormBasic.controls;
    let fD = this.signupFormDoctor.controls;
    if (fB.password.value != fB.confirmPassword.value) {
      this.toaster.showToastMessage("Passwords don't match", '', 'error');
    } else {
      let body: any = {
        _id: this.userData._id,
        token: this.localStorage.getItem('token'),
        Name: fB.name.value,
        Gender: fB.gender.value,
        DOB: new Date(fB.dob.value).getTime(),
        Email: fB.email.value,
        Mobile: fB.phone.value,
        Address: fB.address.value,
        Location: this.localStorage.getItem('user-data')[0].Location,
        Postcode: '',
        Role: 'user',
      };
      if (fB.password.value != '') {
        body['Password'] = fB.password.value;
      }
      if (this.isDoctor) {
        body['Qualification'] = fD.qualification.value;
        body['Experience'] = +fD.experience.value;
        body['Specalization'] = fD.specialization.value;
        body['HospitalId'] = +fD.hospital.value;
        body.Role = 'doctor';
      }
      let url = this.isDoctor
        ? AppConfig.UPDATE_PROFILE_DOCTOR
        : AppConfig.UPDATE_PROFILE_USER;
      this.dataManager.authorization(url, body).subscribe((data) => {
        if (data.status) {
          this.toaster.showToastMessage(
            'Profile updated successfully,Redirecting to Sign-in page',
            '',
            'success'
          );
          setTimeout(() => {
            this.showSpinner = false;
            this.authService.signOut();
          }, 2000);
        } else {
          this.showSpinner = false;
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
          let hospital = this.hospitals.filter((each: any) => {
            return each.HospitalId == this.userData.HospitalId;
          });
          this.signupFormDoctor.controls.hospital.setValue(
            hospital[0].HospitalId
          );
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
}
