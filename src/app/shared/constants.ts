import {MenuModel} from './menu-model';


export const apiHost = 'http://206.189.144.26';
// export const apiHost = 'http://198.58.98.36';
export const apiPort = '5000';

export const delayHttpRequest = 2000;
export const delayAnotherProcess = 5000;

export const defaultNavSideBarSize = 250;
export const defaultMainContentPadding = 25;


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
