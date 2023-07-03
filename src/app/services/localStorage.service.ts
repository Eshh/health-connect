import { Injectable } from '@angular/core';
import { WindowRef } from './window.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private isBrowser: boolean = false;
  constructor(private windowRef: WindowRef) {
    this.isBrowser = this.windowRef.isWindowAvailable();
  }
  setIsLogin(state: boolean) {}

  public getItem(key: any): any {
    if (this.isBrowser) {
      try {
        return window.localStorage.getItem(key);
      } catch (e) {}
    } else {
      return '';
    }
  }

  public setItem(key: any, value: any) {
    if (this.isBrowser) {
      try {
        window.localStorage.setItem(key, value);
      } catch (e) {}
    }
  }

  clearStorage() {
    if (this.isBrowser) {
      try {
        window.localStorage.clear();
      } catch (e) {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i];
          var eqPos = cookie.indexOf('=');
          var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
      }
    }
  }

  deleteItem(key: any) {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {}
  }
  // set item in localstorage
  public setItemToLocalStore(key: any, value: any) {
    value = btoa(JSON.stringify(value));
    if (this.isBrowser) {
      try {
        window.localStorage.setItem(key, value);
      } catch (e) {}
    }
  }
  public setData(key: any, value: any) {
    value = JSON.stringify(value);
    if (this.isBrowser) {
      try {
        window.localStorage.setItem(key, value);
      } catch (e) {}
    }
  }
  public getData(key: any): any {
    if (this.isBrowser) {
      try {
        let obj = window.localStorage.getItem(key);
        if (obj) return JSON.parse(obj);
      } catch (e) {}
    } else {
      return '';
    }
  }
}
