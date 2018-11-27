/**
 *
 */
import {createMenu} from './constants';
import {MenuModel} from './menu-model';

export class MenuList {

  private defaultOnMenuSelectedClass = 'on-menu-selected';

  private back = <MenuModel> { ...createMenu, menu: 'Back', icon: 'arrow_back', divider: true, isBackButton: true};

  private home = <MenuModel> { ...createMenu, selector: ['app'], menu: 'Home', icon: 'domain', };

  protected mainDataRootSelector = 'mainData';
  private mainData = <MenuModel> { ...createMenu, selector: [this.mainDataRootSelector], menu: 'Main Data', icon: 'vertical_split',
    childs: [
      this.back,
      <MenuModel> { ...createMenu, selector: [this.mainDataRootSelector, 'pendaratan'], menu: 'Pendaratan', icon: 'looks_one',
        childs: [
          this.back,
          <MenuModel> { ...createMenu, selector: [this.mainDataRootSelector, 'pendaratan', 's'], menu: 'aa', icon: 'looks_one'},
          <MenuModel> { ...createMenu, selector: [this.mainDataRootSelector, 'pendaratan', 'd'], menu: 'ss', icon: 'looks_two'},
          <MenuModel> { ...createMenu, selector: [this.mainDataRootSelector, 'pendaratan', 'f'], menu: 'dd ff', icon: 'looks_3'},
          <MenuModel> { ...createMenu, selector: [this.mainDataRootSelector, 'pendaratan', 'g'], menu: 'ff rr', icon: 'looks_4'}
        ]
      },
      <MenuModel> { ...createMenu, selector: [this.mainDataRootSelector, 'operasional'], menu: 'Operasional', icon: 'looks_two'},
      <MenuModel> { ...createMenu, selector: [this.mainDataRootSelector, 'biologiUkuran'], menu: 'Biologi Ukuran', icon: 'looks_3'},
      <MenuModel> { ...createMenu, selector: [this.mainDataRootSelector, 'biologiReproduksi'], menu: 'Biologi Reproduksi', icon: 'looks_4'}
    ]
  };

  private masterData = <MenuModel> { ...createMenu, selector: ['masterData'], menu: 'Master Data', icon: 'blur_linear'};

  private administrator = <MenuModel> { ...createMenu, selector: ['administrator'], menu: 'Administrator', icon: 'supervised_user_circle'};


  // state dari menu yang terpilih sebelumnya
  private selectorsState = [];

  // Nama menu yang terpilih
  menuSelected = '';

  // Level dari menu yang di pilih
  menuLevelState = 1;

  // menu yang akan ditampilkan
  showedMenu = this.getMenus();

  private constructor() {}
  static getInstance(): MenuList {
    return new MenuList();
  }

  /**
   * mengambil data menu
   *
   */
  getMenus() {
    return [
      this.home, // menu home
      this.mainData, // menu main data
      this.masterData, // menu master data
      this.administrator // menu administrator
    ];
  }



  backFn() {
    if (this.showedMenu && this.showedMenu.length > 1) {
      const stateSelectors = this.showedMenu[1].selector;
      const length = stateSelectors.length;
      if ( length <= 2) {
        return [];
      } else {
        const newSelectors = [];
        for (let i = 0; i < length - 2; i++) {
          newSelectors.push(stateSelectors[i]);
        }
        return newSelectors;
      }
    } else {
      return [];
    }
  }


  repaintChilds(childs: MenuModel[]) {
    childs.forEach(child => {
      child.cssClassOfColor = 'on-menu-not-selected';
    });

    return childs;
  }


  /**
   * Selecting menu list di sidebar yang akan terpilih
   *
   * */
  selectMenu(property: string[] | any, elOfSideNavBar?, mobileQuery?) {

    let haveChild = false;
    const selectors = (property.selector)
      ? ((property.isBackButton) ? this.backFn() : property.selector)
      : property;

    this.showedMenu = this.getMenus();
    if (selectors && this.showedMenu) {

      // ubah nilai state selectors sebelumnya
      this.selectorsState = selectors;

      if (selectors.length === 0) {
        this.showedMenu = this.getMenus();
        // this.menuSelected = '- Select Menu -';
      } else {

        selectors.forEach((selector, level) => {
          this.showedMenu.forEach(menu => {
            if (menu.selector[level] === selector) {
              this.menuSelected = menu.menu;
              if (menu.childs) {
                haveChild = true;
                this.showedMenu = this.repaintChilds(menu.childs);
                // return;
              } else {
                menu.cssClassOfColor = this.defaultOnMenuSelectedClass;
                // return;
              }


            } else {
              menu.cssClassOfColor = 'on-menu-not-selected';
            }
          });
        });
      }
    } else {
      this.showedMenu = [];
    }


    if (mobileQuery && mobileQuery.matches && elOfSideNavBar !== undefined) {
      if (!haveChild && !property['isBackButton']) {
        elOfSideNavBar.close();
      }
    }

  }

}

