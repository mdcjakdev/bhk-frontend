import {AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MenuList} from '../../shared/menu-list';
import {ComponentUtil} from '../../shared/component-util';
import {NgScrollbar} from 'ngx-scrollbar';
import {DashboardSharedService} from '../../services/dashboard-shared.service';
import {Router} from '@angular/router';

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

  start = false;
  constructor(
    private router: Router,
    private bhkSharedService: DashboardSharedService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    super(bhkSharedService, changeDetectorRef, media);
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

    // passing element sidenavbar ke child
    this.bhkSharedService.addSideNav(this.snav);
  }

  ngAfterViewInit(): void {
  }

  getSidenavMode() {
    return (this.mobileQuery.matches) ? 'over' : 'side';
  }

  /** redirect page to specific url */
  navigating(routeUrl, params?) {
    if (routeUrl === undefined || routeUrl.trim().length === 0) {
      return;
    }

    if (routeUrl !== this.router.url) {
        this.router.navigate([routeUrl]);
    }
  }

  toggle(sidenav) {
    sidenav.toggle();
  }

  onMenuSelected(m, sidenav, url?) {
    if (this.mobileQuery.matches) {
      if (m.isBackButton || m.childs ) {
      } else {
        sidenav.close();
      }
    }

    this.menus.selectMenu(m, sidenav, this.mobileQuery);

    this.navigating(url);
  }


  @HostListener('scroll', ['$event'])
  onScroll(event) {
    // tambah nilai perubahan pada setiap aksi user yang melakukan scroll pada page
    this.bhkSharedService.addScrolledByUser(event.target.scrollTop);
  }

}
