import {HttpClient} from '@angular/common/http';
import {delayAnotherProcess} from './constants';


export class AppHttpGenerate {

  public waiting = true;

  public failed = false;

  constructor(
    public http: HttpClient,
    public functionRequest: Function,
    public callbackSuccess?: Function,
    public callbacError?: Function
  ) {

  }

  generate() {
    this.failed = false;
    this.waiting = true;

    setTimeout(() => {

      this.functionRequest(this.http).subscribe(
        value => {
          this.waiting = false;
          if (this.callbackSuccess) {
            this.callbackSuccess(value);
          }
        },
        error => {
          this.waiting = false;
          this.failed = true;
          if (this.callbacError) {
            this.callbacError(error);
          }
        }
      );
    }, delayAnotherProcess)
  }

}
