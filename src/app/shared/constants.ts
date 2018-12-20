import {MenuModel} from './menu-model';
import {ReactiveFormUtil} from './reactive-form-util';
import {MatFormFieldAppearance} from '@angular/material';

export const UUID_COLUMN = 'uuid';

// export const apiHost = 'http://206.189.144.26';
export const apiHost = 'http://localhost';
// export const apiHost = 'http://192.168.0.24';
// export const apiPort = '4200';
export const apiPort = '8000';
// export const apiPort = '5000';

export const delayHttpRequest = 200;
export const delayAnotherProcess = 5000;

export const defaultNavSideBarSize = 250;
export const defaultMainContentPadding = 35;


/**
 * Buat menu default
 */
export const createMenu = <MenuModel> {
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
export const formFieldAppearance = {
  LEGACY: 'legacy',
  STANDARD: 'standard',
  FILL: 'fill',
  OUTLINE: 'outline'
};

/** data-data konstant yang bisa diakses **/
export class Constants {

  formFieldAppearance = formFieldAppearance.LEGACY;
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


