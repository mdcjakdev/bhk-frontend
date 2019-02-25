import {HttpClient} from '@angular/common/http';
import {delayAnotherProcess} from './constants';
import {Observable} from 'rxjs';
import {first} from 'rxjs/operators';


export class AppHttpGenerate {

  public waiting = true;

  public failed = false;


  public document: any;

  constructor(
    public http: HttpClient,
    public functionRequest: Function
  ) {

  }



  generate(success?: (value: any) => void, failed?: (error: any) => void, params?: any) {
    this.failed = false;
    this.waiting = true;

    const setHttp = <Observable<any>> this.functionRequest(params);

    setTimeout(() => {

      setHttp.pipe(first()).subscribe(
        value1 => {
          this.document = value1;
          this.waiting = false;
          if (success) {
            success(value1);
          }
        },
        (error1: any) => {
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
