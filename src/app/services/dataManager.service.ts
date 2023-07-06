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
    let headers: any = {
      headers: new HttpHeaders({
        'x-access-token': this.token,
      }),
    };
    return headers;
  }

  APIGenericGetMethod(url: string) {
    return this.httpClient.get(url, this.getHeaders()).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  APIGenericPostMethod(url: string, entityObject: {}) {
    return this.httpClient.post(url, entityObject, this.getHeaders()).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
