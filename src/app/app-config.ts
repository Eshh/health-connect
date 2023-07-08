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

  constructor() {}
  public static setConfiguration() {
    AppConfig.SIGN_IN_API = AppConfig.BASE_API_URL + 'signin';
    AppConfig.SIGN_UP_API_USER = AppConfig.BASE_API_URL + 'add/role/user';
    AppConfig.SIGN_UP_API_DOCTOR = AppConfig.BASE_API_URL + 'add/role/doctor';
    AppConfig.HOSPITAL_LIST = AppConfig.BASE_API_URL + 'list/hospitals';
    AppConfig.SLOTS_API = AppConfig.BASE_API_URL + 'insert/slots';
  }
}
AppConfig.setConfiguration();
