import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root',
})
export class DataManager {
  token: any = null;
  constructor(
    private httpClient: HttpClient,
    private locaStorage: LocalStorageService
  ) {
    this.token = this.locaStorage.getItem('token');
  }

  getHeaders(flag: string = '') {
    let headers: any = {};
    if (flag == 'sign') {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
    } else {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.token,
      });
    }
    return headers;
  }

  getOptions(flag: string = '') {
    let options = {
      headers: this.getHeaders(flag),
    };
    return options;
  }

  APIGenericGetMethod(url: string) {
    return this.httpClient.get(url, this.getOptions()).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  APIGenericPostMethod(url: string, entityObject: {}) {
    return this.httpClient.post(url, entityObject, this.getOptions()).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  authorization(url: string, entityObject: {}) {
    return this.httpClient
      .post(url, entityObject, this.getOptions('sign'))
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  getHospitals(url: any) {
    return this.httpClient.get(url, this.getOptions('sign')).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
