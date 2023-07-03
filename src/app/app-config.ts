import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {
  // Environment Variable
  public static ENVIRONMENT = 'DEV';
  // The prefix for all apis
  public static BASE_API_URL = 'https://health-connect-nq54.onrender.com/';

  // APIs
  public static SIGN_IN_API = '';
  public static SIGN_UP_API = '';

  constructor() {}
  public static setConfiguration() {
    AppConfig.SIGN_IN_API = AppConfig.BASE_API_URL + 'signin';
    // AppConfig.SIGN_UP_API = AppConfig.BASE_API_URL + 'signup';
  }
}
AppConfig.setConfiguration();
