import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfig } from 'src/app/app-config';
import { DataManager } from 'src/app/services/dataManager.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { Toaster } from 'src/app/utils/toast-util';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.css'],
})
export class PrescriptionsComponent implements OnInit {
  mode: string = '';

  prescriptions: any = [];
  addPxMode: boolean = false;
  consultationI: any = -1;
  userType: string = '';
  today: any = new Date();

  // view mode
  viewPrescriptionData: any = [];

  pxFormGroup: any = this.formBuilderAngular.group({
    pxFormArray: this.formBuilderAngular.array([]),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilderAngular: FormBuilder,
    private dataManager: DataManager,
    private toaster: Toaster,
    private router: Router,
    private localStorage: LocalStorageService
  ) {
    this.activatedRoute.params.subscribe((params: any) => {
      // this.mode = params.type;
      this.consultationI = params.consultationId;
      this.userType = this.localStorage.getData('user-data')[0].Role;
    });
  }

  ngOnInit(): void {
    this.formBuilder();
    this.getPrescription();
  }

  getPrescription() {
    this.dataManager
      .APIGenericGetMethod(AppConfig.GET_PRESCRIPTIONS + this.consultationI)
      .subscribe((data) => {
        if (Object.keys(data.response.prescriptions).length > 0) {
          this.mode = 'view';
          this.viewPrescriptionData = data.response;
          console.log(this.viewPrescriptionData);
        } else {
          this.mode = 'add';
        }
      });
  }

  formBuilder() {
    let vArray: any = this.pxFormGroup.get('pxFormArray') as FormArray;
    this.prescriptions.forEach((each: any, index: number) => {
      if (index == this.prescriptions.length - 1) {
        vArray.push(
          this.formBuilderAngular.group({
            medicine: new FormControl(each.medicine, [Validators.required]),
            dosageMorning: new FormControl(each.dosageMorning, [
              Validators.required,
            ]),
            dosageNoon: new FormControl(each.dosageNoon, [Validators.required]),
            dosageNight: new FormControl(each.dosageNight, [
              Validators.required,
            ]),
            duration: new FormControl(each.duration, [Validators.required]),
            remarks: new FormControl(each.remarks),
          })
        );
      }
    });
  }
  fillVisaCountryArray(flag: string) {
    if (flag == 'add') {
      this.prescriptions.push({
        medicine: '',
        dosageMorning: false,
        dosageNoon: false,
        dosageNight: false,
        duration: '',
        remarks: '',
      });
    } else {
      let v: any = this.pxFormGroup.get('pxFormArray') as FormArray;
      this.prescriptions.forEach((each: any, i: number) => {
        this.prescriptions[i] = {
          medicine: v.controls[i].controls.value,
          duration: v.controls[i].controls.duration.value,
          dosageMorning: v.controls[i].controls.dosageMorning.value,
          dosageNoon: v.controls[i].controls.dosageNoon.value,
          dosageNight: v.controls[i].controls.dosageNight.value,
          remarks: v.controls[i].controls.remarks.value,
        };
      });
    }
  }

  addPrescription() {
    this.addPxMode = true;
    this.fillVisaCountryArray('add');
    this.formBuilder();
  }
  savePrescription(i: number) {
    let aArray = this.pxFormGroup.get('pxFormArray') as FormArray;
    if (aArray.controls[i].valid) {
      this.fillVisaCountryArray('fill');
      this.addPxMode = false;
    }
  }

  postBodyGenerator() {
    let body: any = {
      ConsultationId: this.consultationI,
      Drugs: [],
    };
    let pArray: any = this.pxFormGroup.get('pxFormArray') as FormArray;
    pArray.controls.forEach((each: any) => {
      body.Drugs.push({
        DrugName: each.controls['medicine'].value,
        Dosage: this.getDosage(each),
        Days: each.controls['duration'].value,
        Comments: each.controls['remarks'].value,
      });
    });
    return body;
  }
  getDosage(pX: any) {
    return {
      Morning: pX.controls.dosageMorning.value,
      Night: pX.controls.dosageNight.value,
      Afternoon: pX.controls.dosageNoon.value,
    };
  }

  postApi() {
    let body: any = this.postBodyGenerator();
    // return;
    this.dataManager
      .APIGenericPostMethod(AppConfig.ADD_PRESCRIPTION, body)
      .subscribe((data) => {
        if (data['status']) {
          this.toaster.showToastMessage(
            'prescription added successfully',
            '',
            'success'
          );
          setTimeout(() => {
            this.router.navigate(['consultations']);
          });
        }
      });
  }
}
