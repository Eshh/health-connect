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

  getHeaders() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.token,
    });
    return headers;
  }

  getOptions() {
    let options = {
      headers: this.getHeaders(),
    };
    return options;
  }

  APIGenericGetMethod(url: string) {
    console.log(this.getOptions(), this.token);
    return this.httpClient.get(url, this.getOptions()).pipe(
      map((response: any) => {
        console.log(response);
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
}
