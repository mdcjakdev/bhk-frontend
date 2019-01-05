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

/**
 * Melakukan trim pada object data dari reactive form
 */
export function trimReactiveObject(object, skipProperties = []) {
  let returnObject = {};

  for (const k in object) {
    if (object.hasOwnProperty(k)) {
      let find = false;
      for (const skip of skipProperties) {
        if (skip === k) {
          find = true;
          break;
        }
      }

      if (find) { // jika di skip properti nya
        returnObject = { ...returnObject, [k]: object[k] };
      } else if (typeof object[k] === 'string') {
        returnObject = { ...returnObject, [k]: object[k].trim() };
      } else if (typeof object[k] === 'object') {
        if (object[k].length !== undefined) { // object array
          const arrays = [];
          for (const array of object[k]) {
            arrays.push({...trimReactiveObject(array)});
          }
          returnObject = { ...returnObject, [k]: arrays };
        } else { // normal object
          returnObject = { ...returnObject, [k]: {...trimReactiveObject(object[k])} };
        }
      } else {
        returnObject = { ...returnObject, [k]: object[k] };
      }


    }
  }

  return returnObject;
}





export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';
