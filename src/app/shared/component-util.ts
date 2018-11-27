import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {defaultMainContentPadding, defaultNavSideBarSize} from './constants';


export class ComponentUtil implements OnDestroy {

  private defaultFromTop = 240; // in pixel

  // max lebar dari media
  mediaMaxWidth = '(max-width: 768px)';

  // untuk melakukan analisis terhadap media dimana aplikasi running
  mobileQuery: MediaQueryList;
  // event media query
  private __mobileQueryListener: () => void;

  xContextMenuOfTable = 0;
  yContextMenuOfTable = 0;
  onTableTargetSelected;

  constructor(
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    // init listener media query
    this.mobileQuery = media.matchMedia(this.mediaMaxWidth);
    this.__mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.__mobileQueryListener);
  }

  isMobile() {
    return (this.mobileQuery.matches);
  }

  ngOnDestroy(): void {
    // destroy listener media query
    this.mobileQuery.removeListener(this.__mobileQueryListener);
  }


  positioningXY(event, navSize = defaultNavSideBarSize, contentPadding = defaultMainContentPadding, fromTop = this.defaultFromTop) {
    const yPos = event.clientY - ((this.mobileQuery.matches) ? (fromTop - 15) : fromTop);
    const xPos = event.clientX - (((this.mobileQuery.matches) ? 0 : navSize) + contentPadding);
    return {
      y: yPos,
      x: xPos
    };
  }


  tableMenuRightClickOnClose(event) {
    this.onTableTargetSelected.classList.remove('tr-show-menu');
  }


  showTableMenuOnRightClick(event, menu, navSize = defaultNavSideBarSize,
                            contentPadding = defaultMainContentPadding, fromTop = this.defaultFromTop) {
    this.onTableTargetSelected = event.target.parentElement;
    this.onTableTargetSelected.classList.add('tr-show-menu');
    event.preventDefault();
    this.xContextMenuOfTable = this.positioningXY(event, navSize, contentPadding, fromTop).x;
    this.yContextMenuOfTable = this.positioningXY(event, navSize, contentPadding, fromTop).y;
    menu.openMenu();

    document.getElementsByClassName('cdk-overlay-container')[0].addEventListener('contextmenu', (offEvent: any) => {
      menu.closeMenu();
      offEvent.preventDefault();
    });
  }


  preventDefaultMode(event) {
    event.preventDefault();
  }


}
