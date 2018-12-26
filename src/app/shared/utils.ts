import {ErrorStateMatcher} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import * as moment from 'moment';


export class AppErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export function printWord(text: any, showLength) {
  const value = String(text) + '';
  return (value.length > showLength) ? (value.substring(0, showLength) + '....') : value;
}


export function momentParsingDate(v) {

  moment.locale('id');
  return moment(v).format('LL');
}

export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';
