import { Injectable } from "@angular/core";

@Injectable()

export class AppConfig{
  public static TENANT_NAME = '';

  public static ENVIRONMENT = 'DEV';
  public static BASE_API_URL = '';

  constructor(){}
  public static setConfiguration(){
    console.log('Config set')
  }

}
AppConfig.setConfiguration();
