import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MenuList} from '../../shared/menu-list';
import {ComponentUtil} from '../../shared/component-util';
import {NgScrollbar} from 'ngx-scrollbar';
import {DashboardSharedService} from '../../services/dashboard-shared.service';
import {Router} from '@angular/router';
import {BhkService} from "../../services/bhk.service";
import {LOGIN, OAUTH, USER} from "../../shared/utils";

@Component({
  selector: 'app-bhk-dashboard',
  templateUrl: './bhk-dashboard.component.html',
  styleUrls: ['./bhk-dashboard.component.scss'],
})
export class BhkDashboardComponent
  extends ComponentUtil<any>
  implements OnInit, AfterViewInit, AfterViewChecked {

  // mengambil instance dari menu list yang diinisialisasi
  menus = MenuList.getInstance();

  @ViewChild('mainScroll', {read: NgScrollbar}) scrollRef: NgScrollbar;

  @ViewChild("sidenav") snav;

  @ViewChild("mainContentContainer") mainContentContainer;


  next = 'animated  fadeOutDown';


  start = false;
  constructor(
    private router: Router,
    public bhk: BhkService,
    public bhkSharedService: DashboardSharedService,
    public changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    super(bhkSharedService, changeDetectorRef, media);

  }

  ngOnInit() {

    // this.bhk.userInfo.subscribe(value => console.log('annas ', value));

    console.log('Annas ', this.bhk.userInfo.value)

    // init menu awal yang terpilih
    this.menus.selectMenu(['app']);

    setTimeout(() => {
      this.bhkSharedService.addLoadingBarIndicator(false);
    }, 2000);

    // passing element sidenavbar ke child
    this.bhkSharedService.addSideNav(this.snav);
  }

  ngAfterViewInit(): void {


    // subscribe main scroll event scrolling
    this.scrollRef.scrollable.elementScrolled().subscribe(
      value => this.onScroll(value)
    );

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
        if (routeUrl !== "/app") {
          /* mengaktifkan loading bar */
          this.bhkSharedService.addLoadingBarIndicator(true);
        } else {
          this.bhkSharedService.addLoadingBarIndicator(false);
        }

        setTimeout(() => {
          /* navigate ke url yang dituju */
          this.router.navigate([routeUrl]);
        }, this.delayBeforeGoToNextPage)
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
    // const v = document.getElementById('mainContentContainerId');
    // console.log('mainContentContainer ', this.mainContentContainer, v.offsetTop)
    // console.log('event.pageYOffset ', window.pageYOffset)
    // tambah nilai perubahan pada setiap aksi user yang melakukan scroll pada page
    this.bhkSharedService.addScrolledByUser(event.target.scrollTop);
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  removeAuthenticationInfo() {
    this.bhk.addUserInfo(undefined);
    this.bhk.addLoginInfo(undefined);
    this.bhk.addOauthInfo(undefined);
    localStorage.removeItem(LOGIN);
    localStorage.removeItem(USER);
    localStorage.removeItem(OAUTH);
  }

  logout() {
    this.removeAuthenticationInfo();
    setTimeout(() => {
      this.router.navigate(['/'])
    }, 100);
  }
}
