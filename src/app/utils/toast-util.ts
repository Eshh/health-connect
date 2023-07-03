import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class Toaster {
  constructor(private toastr: ToastrService) {}
  showToastMessage(
    message: string,
    title: string,
    messageType: string,
    ToastConfig: any = {}
  ) {
    if (messageType == 'success') {
      this.toastr.success(
        message,
        title,
        Object.keys(ToastConfig).length > 0 ? ToastConfig : ''
      );
    } else if (messageType == 'error') {
      this.toastr.error(
        message,
        title,
        Object.keys(ToastConfig).length > 0 ? ToastConfig : ''
      );
    } else if (messageType == 'info') {
      this.toastr.info(
        message,
        title,
        Object.keys(ToastConfig).length > 0 ? ToastConfig : ''
      );
    } else if (messageType == 'warning') {
      this.toastr.warning(
        message,
        title,
        Object.keys(ToastConfig).length > 0 ? ToastConfig : ''
      );
    } else {
      this.toastr.info(
        message,
        title,
        Object.keys(ToastConfig).length > 0 ? ToastConfig : ''
      );
    }
  }

  clearAllToasts() {
    this.toastr.clear();
  }
}
