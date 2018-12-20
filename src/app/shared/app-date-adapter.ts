import {NativeDateAdapter} from '@angular/material';
import * as moment from 'moment';


export const DATE_PATTERN = 'LL';
export class AppDateAdapter extends NativeDateAdapter  {

  format(date: Date, displayFormat: Object): string {
    moment.locale('id');
    return moment(date).format(DATE_PATTERN);
  }




}
