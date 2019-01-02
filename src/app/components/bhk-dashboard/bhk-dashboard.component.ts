import {AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MenuList} from '../../shared/menu-list';
import {ComponentUtil} from '../../shared/component-util';
import {NgScrollbar} from 'ngx-scrollbar';

@Component({
  selector: 'app-bhk-dashboard',
  templateUrl: './bhk-dashboard.component.html',
  styleUrls: ['./bhk-dashboard.component.scss'],
})
export class BhkDashboardComponent
  extends ComponentUtil<any>
  implements OnInit, AfterViewInit {

  // mengambil instance dari menu list yang diinisialisasi
  menus = MenuList.getInstance();


  @ViewChild('mainScroll', {read: NgScrollbar}) scrollRef: NgScrollbar;


  @ViewChild("sidenav") snav;

  scrolledByUser = 0;


  start = false;
  constructor(
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    super(changeDetectorRef, media);
  }

  ngOnInit() {
    // subscribe main scroll event scrolling
    this.scrollRef.scrollable.elementScrolled().subscribe(
      value => this.onScroll(value)
    );

    // init menu awal yang terpilih
    this.menus.selectMenu(['app']);
    setTimeout(() => {
      this.start = true;
      setTimeout(() => this.start = false, 2000);
    }, 2000);
  }

  ngAfterViewInit(): void {
  }



  getSidenavMode() {
    return (this.mobileQuery.matches) ? 'over' : 'side';
  }


  toggle(sidenav) {
    console.log(sidenav.opened);
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


  @HostListener('scroll', ['$event'])
  onScroll(event) {
    this.scrolledByUser = event.target.scrollTop;
    // console.log('tinggi', event.target.scrollTop );
  }

}
