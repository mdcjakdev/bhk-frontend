import {MenuModel} from './menu-model';
import {ReactiveFormUtil} from './reactive-form-util';

export const UUID_COLUMN = 'uuid';

// export const apiHost = 'http://206.189.144.26';
export const apiHost = 'http://localhost';
// export const apiHost = 'http://192.168.0.29';
// export const apiPort = '4200';
export const apiPort = '8000';
// export const apiPort = '5000';

export const delayHttpRequest = 500;
export const delayAnotherProcess = 0;

export const defaultNavSideBarSize = 250;
export const defaultMainContentPadding = 35;

export const SNACKBAR_SUCCESS_STYLE = 'success-snackbar';
export const SNACKBAR_ERROR_STYLE = 'error-snackbar';
export const SNACKBAR_WARNING_STYLE = 'warning-snackbar';


export const statusDokumen = {
  DRAFT: 'DRAFT',
  APPROVED: 'APPROVED',
  CHECKED: 'CHECKED',
  CANCELED: 'CANCELED'
};

/**
 * Buat menu default
 */
export const createMenu = <MenuModel>{
  url: undefined,
  selector: [],
  menu: undefined,
  icon: undefined,
  cssClassOfColor: '',
  divider: false,
  childs: undefined,
  isBackButton: false,
  backButtonCallback: undefined
};

/**
 * Standard form filed style
 */
export const formFieldAppearanceSet = {
  LEGACY: 'legacy',
  STANDARD: 'standard',
  FILL: 'fill',
  OUTLINE: 'outline'
};

/** data-data konstant yang bisa diakses **/
export class Constants {
  formFieldAppearance = formFieldAppearanceSet.LEGACY;
  public reactiveFormUtil = new ReactiveFormUtil();
}

/**
 * Mengambil nilai berdasarkan tingkatan kedalaman levelnya
 * @param value, nilai awal
 * @param levels, kedalaman level array nya
 */
export function delegateLevelValue(value, levels: string[]) {
  for (const name of levels) {
    value = value[name];
  }
  return value;
}


export function openAppSnackbar(snack, message, styleCss = SNACKBAR_SUCCESS_STYLE, duration = 1000) {
  snack.open(message, '', {
    duration: duration,
    panelClass: [styleCss]
  });
}

function padZero(str, len?) {
  len = len || 2;
  const zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

function rgb2hex(rgb) {
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return (rgb && rgb.length === 4) ? '#' +
    ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
}

export function invertColor(hex, bw = true) {

  if (hex.length > 7) {
    hex = rgb2hex(hex);
  }



  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }

  // console.log(hex.substring(0, 1))




  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }



  // console.log(hex)

  // if (hex.length !== 6) {
  //   throw new Error('Invalid HEX color.');
  // }
  let r: any = parseInt(hex.slice(0, 2), 16);
  let g: any = parseInt(hex.slice(2, 4), 16);
  let b: any = parseInt(hex.slice(4, 6), 16);

  if (bw) {
    // http://stackoverflow.com/a/3943023/112731
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186
      ? '#000000'
      : '#FFFFFF';
  }
  // invert color components
  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b);
}

