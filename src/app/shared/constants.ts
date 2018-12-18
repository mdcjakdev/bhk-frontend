import {MenuModel} from './menu-model';


// export const apiHost = 'http://206.189.144.26';
export const apiHost = 'http://localhost';
// export const apiPort = '4200';
export const apiPort = '8000';
// export const apiPort = '5000';

export const delayHttpRequest = 500;
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
