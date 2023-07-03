import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AppConfig } from 'src/app/app-config';
import { DataManager } from 'src/app/services/dataManager.service';
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
    postcode: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
  });
  signupFormDoctor = new FormGroup({
    qualification: new FormControl(),
    experience: new FormControl(),
    specialization: new FormControl(),
    hospital: new FormControl(),
  });
  constructor(
    private formBuilder: FormBuilder,
    private toaster: Toaster,
    private dataManager: DataManager
  ) {}

  ngOnInit(): void {
    this.initaiteForms('basic');
  }

  initaiteForms(param: string) {
    if (param == 'basic') {
      this.signupFormBasic = this.formBuilder.group({
        name: ['', [Validators.required]],
        gender: ['', [Validators.required, Validators.minLength(3)]],
        dob: [new Date(), [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.minLength(3)]],
        address: ['', [Validators.required]],
        postcode: ['', [Validators.required]],
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
    }
  }

  buildDoctorForm() {
    this.isDoctor = !this.isDoctor;
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
        Dob: fB.dob.value,
        Email: fB.email.value,
        Phone: fB.phone.value,
        Address: fB.address.value,
        Postcode: fB.postcode.value,
        Password: fB.password.value,
      };
      if (this.isDoctor) {
        body['qualification'] = fD.qualification.value;
        body['experience'] = fD.experience.value;
        body['specialization'] = fD.specialization.value;
        body['hospital'] = fD.hospital.value;
      }
      let url = this.isDoctor
        ? AppConfig.SIGN_UP_API_DOCTOR
        : AppConfig.SIGN_UP_API_USER;
      this.dataManager.APIGenericPostMethod(url, body).subscribe(
        (data) => {
          if (data.status) {
          } else {
            this.toaster.showToastMessage(data.errorMessage, '', 'error');
          }
        },
        (error) => {
          this.toaster.showToastMessage(
            'Successfully signed up',
            '',
            'success'
          );
        }
      );
    }
  }
}
