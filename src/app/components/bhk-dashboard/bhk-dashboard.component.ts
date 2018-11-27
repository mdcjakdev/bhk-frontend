import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MenuList} from '../../shared/menu-list';
import {ComponentUtil} from '../../shared/component-util';

@Component({
  selector: 'app-bhk-dashboard',
  templateUrl: './bhk-dashboard.component.html',
  styleUrls: ['./bhk-dashboard.component.scss'],
})
export class BhkDashboardComponent
  extends ComponentUtil
  implements OnInit, AfterViewInit {

  // mengambil instance dari menu list yang diinisialisasi
  menus = MenuList.getInstance();


  @ViewChild("sidenav") snav;


  start = true;
  constructor(
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    super(changeDetectorRef, media);
  }

  ngOnInit() {
    // init menu awal yang terpilih
    this.menus.selectMenu(['app']);
    setTimeout(() => this.start = false, 4000);
  }

  ngAfterViewInit(): void {
  }



  getSidenavMode() {
    return (this.mobileQuery.matches) ? 'over' : 'side';
  }


  toggle(sidenav) {
    sidenav.toggle();
  }

  onMenuSelected(m, sidenav) {
    if (this.mobileQuery.matches) {
      if (m.isBackButton || m.childs ) {
      } else {
        sidenav.close();
      }
    }

    this.menus.selectMenu(m, sidenav, this.mobileQuery);
  }

}
