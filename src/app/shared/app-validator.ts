import {FormControl} from '@angular/forms';
import * as moment from 'moment';
// import {Moment} from 'moment';


export class AppValidator {

  static momentDate(fc: FormControl) {
    if (fc.parent !== undefined) {
      if (moment(fc.value, 'MMM YYYY')) {

      }

      return (null); // benar
    } else {
      return ({ momentDate: false }); // salah
    }
  }

}

