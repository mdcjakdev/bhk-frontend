import {HttpClient} from '@angular/common/http';
import {delayAnotherProcess} from './constants';


export class AppHttpGenerate {

  public waiting = true;

  public failed = false;

  constructor(
    public http: HttpClient,
    public functionRequest: Function
  ) {

  }

  generate(success?: (value: any) => void, failed?: (error: any) => void) {
    this.failed = false;
    this.waiting = true;

    setTimeout(() => {

      this.functionRequest(this.http).subscribe(
        value1 => {
          this.waiting = false;
          if (success) {
            success(value1);
          }
        },
        error1 => {
          this.waiting = false;
          this.failed = true;
          if (failed) {
            failed(error1);
          }
        }
      );
    }, delayAnotherProcess)
  }

}
