import {ErrorStateMatcher} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import * as moment from 'moment';
import { JSEncrypt } from 'jsencrypt';
import { QuickEncrypt } from 'quick-encrypt';
import CryptoJS from 'crypto-js'


export const PRIVATE_KEY = '-----BEGIN RSA PRIVATE KEY-----\n' +
  'MIICXgIBAAKBgQC5a3f+2soYdDVKWmtnTxf1kuiC5Cg/ZBaindHfN7bNN+1cDztJ\n' +
  '3d54parhvdox2IusO5jVLabD6/1tlZUJymHYcz6Z3ezJggtcUlBk6kKdCwaAWIIq\n' +
  'sxODMqtFpXeFCZNXtJSGvqIw1VXS6SivdLefpK2wRedahW8CWHu+UTevxwIDAQAB\n' +
  'AoGAeAwjeaav19tNMWGPTijAS2edEDml8TzdBtYFLm9E9GM0UzktWqrCQfyIwXUI\n' +
  '0uLvs0g2sDbJVOnyf8Or5dXZOI5zA7q8FizXnqiVRMKi8do6OXYYUjlPpcYk1ou7\n' +
  '79MJ+qpMYCYju3QjK5uiIRrkW+NdOMWA1yz61ZDyusTB/PECQQDs00lgc9soQwK3\n' +
  'n9p1sl8gC3GbUBLJ9HLxAuQiXFyd8sggrQvI8D+t4lVieMeRu5ekNEs++y8V9shO\n' +
  'IEQf4kt5AkEAyG6xJsrvwcSpH0vnJVd1lI8TM6fA3TG5XBkdjisVHrWjFPHZUV27\n' +
  'N4tV6A30cR7sXWejQy+LtdSIhfRI+EvFPwJBAMiR6QMXG/TtS8/YQlyLxKSPDJhN\n' +
  'KJyBuxcDK9MuBgJ/K58A74oubsAFf+r1/48dIUCgSVn9wdMIPnxsN0YJkYECQQC9\n' +
  'vMvGxWWiMOFI1znBh8GvGKI8zBkvS9sE7GGmK/KaV6hCM5BeDjUkp6pzOoKkc3me\n' +
  'EnXjLCc9wixbYp2RL2lRAkEApss+n5xqT99uz1dBhDbtR5WNkjdLdkQfXiuy2t0B\n' +
  'PQlHQqiDKdWF5kw1Eg4QE1t+TVMAkhzpJc4Xk1G4tshCBA==\n' +
  '-----END RSA PRIVATE KEY-----';


export const PUBLIC_KEY = '-----BEGIN PUBLIC KEY-----\n' +
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5a3f+2soYdDVKWmtnTxf1kuiC\n' +
  '5Cg/ZBaindHfN7bNN+1cDztJ3d54parhvdox2IusO5jVLabD6/1tlZUJymHYcz6Z\n' +
  '3ezJggtcUlBk6kKdCwaAWIIqsxODMqtFpXeFCZNXtJSGvqIw1VXS6SivdLefpK2w\n' +
  'RedahW8CWHu+UTevxwIDAQAB\n' +
  '-----END PUBLIC KEY-----';


export const LOGIN = 'login';
export const USER = 'user';
export const OAUTH = 'oauth';

export function encrypt(text) {
  return CryptoJS.AES.encrypt(JSON.stringify(text), PUBLIC_KEY).toString();
}

export function decrypt(chiperText) {
  return CryptoJS.AES.decrypt(chiperText, PUBLIC_KEY).toString(CryptoJS.enc.Utf8);
}


export function plantDataToLocalStorage(login, user, oauth) {
  localStorage.setItem(LOGIN, encrypt(JSON.stringify(login)));
  localStorage.setItem(USER, encrypt(JSON.stringify(user)));
  localStorage.setItem(OAUTH, encrypt(JSON.stringify(oauth)));
}


export function generateArrayForm(initValue: any[], formGroupFunction: Function) {
  const data = [];
  initValue.forEach(value => data.push(formGroupFunction(value)));
  return data;
}


export function isUrlAlreadyHasParams(url: string) {
  return url.indexOf('?') > -1;
}


export function convertObjectAsHttpParams(object: any, definedUrl?: string) {
  if (typeof object === 'undefined' || object === null) {
    return '';
  }

  const hasQM = (typeof definedUrl !== 'undefined') ? isUrlAlreadyHasParams(definedUrl) : false;

  let result = '';
  let i = 0;
  for (const param in object) {
    if (object.hasOwnProperty(param)) {
      result += (i === 0) ? ((hasQM) ? '&' : '?') : '&';
      result += (param + '=' + object[param]);
      i++;
    }
  }

  return result;
}

export function qualifyObject(object, property: string, defaultValue: any = '') {
  if (object !== undefined && object !== null) {
    if (object[property] === undefined || object[property] === null) {
      return defaultValue;
    } else {
      return object[property]
    }
  }

  return defaultValue;
}

export function statusGeneralization(validators: Function | any, forGeneralization = false) {
  return (forGeneralization) ? Validators.nullValidator : validators;
}

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
