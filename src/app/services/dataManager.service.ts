import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataManager {
  constructor(private httpClient: HttpClient) {}

  APIGenericGetMethod(url: string) {
    return this.httpClient.get(url).pipe(
      map((response: any) => {
        var data = response;
        var obj: any = {};
        obj.response = data.response;
        obj.status = data.status;
        obj.error = data.error;
        return obj;
      })
    );
  }

  APIGenericPostMethod(url: string, entityObject: {}) {
    return this.httpClient.post(url, entityObject).pipe(
      map((response: any) => {
        var data = response;
        var obj: any = {};
        obj.response = data.response;
        obj.status = data.status;
        obj.error = data.error;
        return obj;
      })
    );
  }
}
