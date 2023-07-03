import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

function _window(): any {
  // return the native window obj
  return window;
}

function _windowMock(): any {
  var window = {
    scrollTo: function (x: any, y: any) {},
  };
  return window;
}

@Injectable()
export class WindowRef {
  private isBrowser: boolean = false;
  constructor(@Inject(PLATFORM_ID) platformId: string) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  get nativeWindow(): any {
    if (!this.isBrowser) return _windowMock();

    return _window();
  }

  isWindowAvailable() {
    if (this.isBrowser) {
      return true;
    } else {
      return false;
    }
  }
}
