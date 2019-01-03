import {ChangeDetectorRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {defaultMainContentPadding, defaultNavSideBarSize, delayHttpRequest, delegateLevelValue, UUID_COLUMN} from './constants';
import {MatExpansionPanel, MatMenuTrigger, MatPaginator, MatSort} from '@angular/material';
import {DataSource} from '@angular/cdk/table';
import {Ui} from './ui';
import {Observable} from 'rxjs';
import {first} from 'rxjs/operators';
import {printWord} from './utils';
import {DashboardSharedService} from '../services/dashboard-shared.service';


/** */
export class ComponentUtil<T extends DataSource<any> | any>
  // extends CrudAction
  implements OnDestroy {


  public pageIndex = 0;

  public pageSize = 20;

  /**
   * standard margin dari top bar
   */
  private defaultFromTop = 100; // in pixel

  /**
   * ukuran batas minimum dari media
   */
  mediaMaxWidth;

  /**
   * untuk melakukan analisis terhadap media dimana aplikasi running
   */
  mobileQuery: MediaQueryList;

  /**
   * event media query
   */
  private __mobileQueryListener: () => void;

  /**
   * Point X dari cursor pada Data Tabel
   */
  xContextMenuOfTable = 0;

  /**
   * Point Y dari cursor pada Data Tabel
   */
  yContextMenuOfTable = 0;

  /**
   * ElementRef yang terpilih (TR), ketika melakukan klik kanan pada data tabel
   */
  onTableTargetSelected;

  /**
   * Mengambil child komponen pencarian data
   */
  @ViewChild(MatExpansionPanel) searchPanel;

  /**
   * Mengambild child paginator untuk data table
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Mengambild child sort untuk data table
   */
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Mengambil komponen trigger untuk klik kanan pada data Table
   */
  @ViewChild('triggerMenuRow', {read: MatMenuTrigger}) menuData: MatMenuTrigger;


  /**
   * Status ketika sedang menunggu proses refresh data sampai selesai
   */
  awaitRefresh = false;

  /**
   * Untuk menandakan posisi accordion dari pencarian data
   */
  awaitSearchIsCollapsed = false;

  /**
   * Status ketika sedang menunggu proses refresh data sampai selesai
   */
  awaitSearch = false;

  /**
   * flag jika komponen ini baru di render untuk pertama kali
   */
  firstInit = false;

  /**
   * untuk menampuang data response utama dari server
   */
  receivedData: any;

  /**
   * Data source yang akan digunakan untuk table data
   */
  dataSource: T;


  // @Input()
  public sideNav;

  // @Input()
  public scrolled = 0;


  private CARD_WRAPPER_ID = '#card-wrapper';


  /**
   *
   * @param changeDetectorRef, detektor perubahan size media
   * @param media,  listener untuk proses deteksi status minimum size
   * @param maxWidth, ukuran batas minimum dari media (default = 900)
   */
  constructor(
    dashboardSharedService: DashboardSharedService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    maxWidth = 900) {

    this.mediaMaxWidth = '(max-width: ' + maxWidth + 'px)';

    // init listener media query
    this.mobileQuery = media.matchMedia(this.mediaMaxWidth);
    this.__mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.__mobileQueryListener);

    /* subscribe parameter yang di sharing dari dashboard*/
    if (dashboardSharedService !== undefined) {
      dashboardSharedService.scrolledByUser.subscribe(value => this.scrolled = value);
      dashboardSharedService.sideNav.subscribe(value => this.sideNav = value);
    }
    /**/
  }

  defaultNoActionVoid(column, value) {
    return value;
  }

  isUuid(column) {
    return (column === UUID_COLUMN);
  }


  printValue(column, columnValue, index, conditionVoid: Function = this.defaultNoActionVoid, showLength = 25) {
    let v = conditionVoid(column, columnValue);
    v = (column === UUID_COLUMN) ? (index + 1) : v;
    return printWord(v, showLength);
  }


  isReceivedDataUndefined() {
    return this.receivedData === undefined;
  }


  /**
   * Mengambil nilai berdasarkan tingkatan kedalaman levelnya
   * @param value, nilai awal
   * @param levels, kedalaman level array nya
   */
  delegateLevelValue(value, levels: string[]) {
    return delegateLevelValue(value, levels);
  }

  /**
   * Status jika kompoenent accorsion pada pencarian telah di expand
   */
  searchExpanded() {
    this.awaitSearchIsCollapsed = false;
  }

  /**
   * Status jika kompoenent accorsion pada pencarian telah di collapse
   */
  searchCollapsed() {
    this.awaitSearchIsCollapsed = true;
  }

  /**
   * Menandakan bahwa media yang mengakses adalah mobil,
   * atau ukuran max media kurang dari listener minimum size yang telah ditentukan
   */
  isMobile() {
    return (this.mobileQuery.matches);
  }



  /** */
  ngOnDestroy(): void {

    // destroy listener media query
    this.mobileQuery.removeListener(this.__mobileQueryListener);
  }


  /**
   * Pengaturan posisi dari trigger menu klik kanan pada data tabel   *
   * @param event, event dari aksi
   * @param navSize, ukuran navigation sidebar
   * @param contentPadding, ukuran padding  standard yang diterapkan pada konten utama
   * @param fromTop, standard margin dari top bar
   */
  positioningXY(event, navSize = defaultNavSideBarSize, contentPadding = defaultMainContentPadding, fromTop = this.defaultFromTop) {

    if (this.sideNav === null) {
      this.sideNav = undefined;
    }
    const yPos = (event.clientY - ((this.mobileQuery.matches) ? (fromTop - 15) : fromTop)) + this.scrolled;
    const xPos = event.clientX - (
      ((this.mobileQuery.matches)
        ? 0
        : ((this.sideNav !== undefined && this.sideNav.opened) ? navSize : 0)) +
      contentPadding);

    return {
      y: yPos,
      x: xPos
    };
  }


  /**
   * Ketika overlay menu klik kanan pada data tabel, telah ditutup   *
   * @param event, event dari aksi
   */
  tableMenuRightClickOnClose(event) {
    this.onTableTargetSelected.classList.remove('tr-show-menu');
  }


  /**
   * Menampilkan menu, setelah melakukan klik kanan pada data tabel   *
   * @param event, event dari aksi
   * @param menu, element MatMenuTrigger yang di ambil dari html komponent
   * @param navSize, ukuran navigation sidebar
   * @param contentPadding, ukuran padding  standard yang diterapkan pada konten utama
   * @param fromTop, standard margin dari top bar
   */
  showTableMenuOnRightClick(event, menu: MatMenuTrigger, navSize = defaultNavSideBarSize,
                            contentPadding = defaultMainContentPadding, fromTop = this.defaultFromTop) {
    this.onTableTargetSelected = event.target.parentElement;

    // tr-show-menu = css untuk memberikan backgroun pada data tabel yang aktif
    this.onTableTargetSelected.classList.add('tr-show-menu');
    this.preventDefaultMode(event);
    this.xContextMenuOfTable = this.positioningXY(event, navSize, contentPadding, fromTop).x;
    this.yContextMenuOfTable = this.positioningXY(event, navSize, contentPadding, fromTop).y;
    menu.openMenu();

    // menambahkan listener contextmenu pada cdk overlay dari menu yang tampil
    document.getElementsByClassName('cdk-overlay-container')[0].addEventListener('contextmenu', (offEvent: any) => {
      menu.closeMenu();
      offEvent.preventDefault();
    });
  }


  /**
   * Prevent default   *
   * @param event event dari aksi
   */
  preventDefaultMode(event) {
    event.preventDefault();
  }


  // SIMPLE CRUD

  serviceGetData(functionGetData: Observable<any> | any,
                 callbackGetDataSuccess: Function,
                 callbackGetDataError?: Function) {
    this.awaitRefresh = true;
    Ui.blockUI(this.CARD_WRAPPER_ID);
    setTimeout(() => {
      functionGetData.pipe(first()).subscribe(
        value => {
          this.receivedData = value;
          callbackGetDataSuccess(this.receivedData);
        },
        error1 => {
          Ui.unblockUI(this.CARD_WRAPPER_ID);
          this.awaitRefresh = false;
          if (callbackGetDataError) {
            callbackGetDataError(error1);
          }
        },
        () => {
          this.firstInit = (!this.firstInit) ? !this.firstInit : this.firstInit; // init awal kompoenent

          Ui.unblockUI(this.CARD_WRAPPER_ID);
          this.awaitRefresh = false;
        }
      );
    }, delayHttpRequest);


  }


  // BATAS SIMPLE CRUD


}
