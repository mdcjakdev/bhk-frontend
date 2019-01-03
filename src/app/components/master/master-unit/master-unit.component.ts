import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Ui} from '../../../shared/ui';
import {MasterUnitService} from '../../../services/master/master-unit/master-unit.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {ComponentUtil} from '../../../shared/component-util';
import {AppTableDataSource} from '../../../shared/table-data-source';
import {MatDialog, MatSnackBar} from '@angular/material';
import {MasterUnitDialogComponent} from './master-unit-dialog/master-unit-dialog.component';
import {Action} from '../../../shared/action.enum';
import {ERROR_STATUS_CODE_0} from '../../../shared/system-error-messages';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {masterLokasiInit} from '../../../inits/master/master-lokasi-init';
import {MasterLokasiDialogComponent} from '../master-lokasi/master-lokasi-dialog/master-lokasi-dialog.component';
import {masterUnitInit} from '../../../inits/master/master-unit-init';
import {openAppSnackbar, SNACKBAR_ERROR_STYLE} from '../../../shared/constants';
import {DashboardSharedService} from '../../../services/dashboard-shared.service';


@Component({
  selector: 'app-master-unit',
  templateUrl: './master-unit.component.html',
  styleUrls: ['./master-unit.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class MasterUnitComponent
  extends ComponentUtil<AppTableDataSource>
  implements OnInit {

  /**
   * Kumpulan array dari nama-nama property data yang di peroleh dari
   * @var receivedData, yang akan ditampilkan pada data tabel
   */

   tableProperties = {
    displayedColumns: ['uuid', 'name', 'deskripsi'],
    displayedHeaders: ['No', 'Nama Unit', 'Deskripsi'],
    levelsOnData: [['uuid'], ['name'], ['deskripsi']],
    isStringDataTypes: [true, true, true]
  };
  private selectedValue: any;
  private isRightClick;


  constructor(
    private bhkSharedService: DashboardSharedService,
    private masterUnitHttpService: MasterUnitService,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {
    super(bhkSharedService, changeDetectorRef, media);
  }


  /** menghilangkan hover style pada row jika menu telah tertutup */
  tableMenuRightClickOnClose(event) {
    this.selectedValue = null;
    super.tableMenuRightClickOnClose(event);
  }

  ngOnInit() {
    this.dataSource = new AppTableDataSource([], this.tableProperties, this.paginator, this.sort);
    this.getData();

    /* set indicator, bahwa page telah berhasil di load */
    this.bhkSharedService.addLoadingBarIndicator(false);
  }

  callbackGetDataError = (error) => {
    if (error.status === 0) {
      openAppSnackbar(this.snackBar, ERROR_STATUS_CODE_0, SNACKBAR_ERROR_STYLE, 2000);
    } else {
      openAppSnackbar(this.snackBar, error.error.message, SNACKBAR_ERROR_STYLE, 2000);
    }
  }

  /**
   * Callback ketika proses pengambilan data ke server berhasil
   * @param response, response dari server
   */
  callbackGetDataSuccess =
    (response) => {
      this.dataSource = new AppTableDataSource(response['content'], this.tableProperties, this.paginator, this.sort);
    }


  /**
   * Service untuk mengambil data ke server
   */
  getData = () => this.serviceGetData(this.masterUnitHttpService.getData(), this.callbackGetDataSuccess, this.callbackGetDataError);


  onTableRightClicked = (event, row) => {
    this.isRightClick = true;
    this.selectedValue = row;
    this.showTableMenuOnRightClick(event, this.menuData);
  }

  onTableLeftClick = (row) => {
    this.isRightClick = false;
    this.selectedValue = (this.selectedValue === row ? null : row);
  }


  /**
   * Untuk Aksi pada data insert atau update
   */
  openDialogData(data = masterUnitInit, action = Action.INSERT) {
    const dialogRef = this.dialog.open(MasterUnitDialogComponent, {
      width: (action === Action.DELETE) ? '250px' : '500px',
      data: {action: action, data: data},
      autoFocus: false,
      position: {bottom: '50px', top: (action === Action.DELETE) ? '150px' : '50px'}
    });

    // callback closing dari dialog
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.getData();
      }
    });
  }


  update() {
    this.openDialogData(this.selectedValue, Action.UPDATE);
  }

  detail() {
    this.openDialogData(this.selectedValue, Action.READ_ONE);
  }

  delete() {
    this.openDialogData(this.selectedValue, Action.DELETE);
  }


  tes2() {
    this.awaitSearch = true;
    Ui.blockUI('#card-search', 0.9, 60);
    setTimeout(() => {
      this.awaitSearch = false;
      Ui.unblockUI('#card-search');
      this.searchPanel.close();
    }, 5000);
  }

}
