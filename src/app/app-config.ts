import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppConfig {
  // Environment Variable
  public static ENVIRONMENT = 'DEV';
  // The prefix for all apis
  public static BASE_API_URL = 'https://health-connect-nq54.onrender.com/';

  // APIs
  public static SIGN_IN_API = '';
  public static SIGN_UP_API_USER = '';
  public static SIGN_UP_API_DOCTOR = '';
  public static HOSPITAL_LIST = '';
  public static SLOTS_API = '';
  public static UPDATE_PROFILE_USER = '';
  public static UPDATE_PROFILE_DOCTOR = '';
  public static GET_HOSPITAL_DOCTORS = '';
  public static BOOK_CONSULTATION = '';
  public static LIST_CONSULTATIONS_USER = '';
  public static LIST_CONSULTATIONS_DOCTOR = '';
  public static ADD_PRESCRIPTION = '';
  public static GET_PRESCRIPTIONS = '';

  constructor() {}
  public static setConfiguration() {
    AppConfig.SIGN_IN_API = AppConfig.BASE_API_URL + 'signin';
    AppConfig.SIGN_UP_API_USER = AppConfig.BASE_API_URL + 'add/role/user';
    AppConfig.SIGN_UP_API_DOCTOR = AppConfig.BASE_API_URL + 'add/role/doctor';
    AppConfig.HOSPITAL_LIST = AppConfig.BASE_API_URL + 'list/hospitals';
    AppConfig.SLOTS_API = AppConfig.BASE_API_URL + 'insert/slots';
    AppConfig.UPDATE_PROFILE_USER = AppConfig.BASE_API_URL + 'update/user';
    AppConfig.UPDATE_PROFILE_DOCTOR = AppConfig.BASE_API_URL + 'update/doctor';
    AppConfig.GET_HOSPITAL_DOCTORS = AppConfig.BASE_API_URL + 'get/doctors?';
    AppConfig.BOOK_CONSULTATION = AppConfig.BASE_API_URL + 'book/consultation';
    AppConfig.LIST_CONSULTATIONS_USER =
      AppConfig.BASE_API_URL + 'get/consultations/user?';
    AppConfig.LIST_CONSULTATIONS_DOCTOR =
      AppConfig.BASE_API_URL + 'get/consultations/doctor?';
    AppConfig.ADD_PRESCRIPTION = AppConfig.BASE_API_URL + 'add/prescription';
    AppConfig.GET_PRESCRIPTIONS = AppConfig.BASE_API_URL + 'get/prescriptions/';
  }
}
AppConfig.setConfiguration();
