import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ComponentUtil} from '../../../shared/component-util';
import {AppTableDataSource} from '../../../shared/table-data-source';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ERROR_STATUS_CODE_0} from '../../../shared/system-error-messages';
import {Action} from '../../../shared/action.enum';
import {Ui} from '../../../shared/ui';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MasterItemService} from '../../../services/master/master-item/master-item.service';
import {masterItemDisables, masterItemInit} from '../../../inits/master/master-item';
import {MasterItemDialogComponent} from './master-item-dialog/master-item-dialog.component';
import {invertColor, openAppSnackbar, SNACKBAR_ERROR_STYLE} from '../../../shared/constants';
import {DashboardSharedService} from '../../../services/dashboard-shared.service';

@Component({
  selector: 'app-master-item',
  templateUrl: './master-item.component.html',
  styleUrls: ['./master-item.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MasterItemComponent
  extends ComponentUtil<AppTableDataSource>
  implements OnInit {

  invertColor = invertColor;
  /**
   * Kumpulan array dari nama-nama property data yang di peroleh dari
   * @var receivedData, yang akan ditampilkan pada data tabel
   */
  tableProperties = {
    displayedColumns: ['uuid', 'kategori', 'subKategori', 'namaKain', 'namaAlias', 'unit'],
    displayedHeaders: ['No', 'Kategori', 'Sub Kategori', 'Item', 'Alias', 'Unit'],
    levelsOnData: [['uuid'], ['kategori', 'namaKategori'], ['subKategori', 'nama'], ['namaKain'], ['namaAlias'], ['unit', 'name']],
    configs: [null, null, null, null, {isArray: true, onArrayIndex: (value: any[]) => value.length - 1, onArrayLevelsData: ['namaAlias']}, null]
  };
  selectedValue: any = null;
  private isRightClick;


  constructor(
    public bhkSharedService: DashboardSharedService,
    private masterItemService: MasterItemService,
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
  };

  /**
   * Callback ketika proses pengambilan data ke server berhasil
   * @param response, response dari server
   */
  callbackGetDataSuccess =
    (response) => {
      this.dataSource = new AppTableDataSource(response['content'], this.tableProperties, this.paginator, this.sort);
    };


  /**
   * Service untuk mengambil data ke server
   */
  getData = (page = this.pageIndex, size = this.pageSize) =>
    this.serviceGetData(this.masterItemService.getData(page, size), this.callbackGetDataSuccess, this.callbackGetDataError);


  onDataSizeChanged(pagination) {
    if (pagination.pageIndex !== this.pageIndex) {
      this.pageIndex = pagination.pageIndex;
      this.pageSize = pagination.pageSize;
    } else {
      this.pageIndex = 0;
      this.pageSize = pagination.pageSize;
    }

    this.getData();
  }

  onTableRightClicked = (event, row) => {
    this.isRightClick = true;
    this.selectedValue = row;
    this.showTableMenuOnRightClick(event, this.menuData);
  };

  onTableLeftClick = (row) => {
    this.isRightClick = false;
    this.selectedValue = (this.selectedValue === row ? null : row);
  };


  /**
   * Untuk Aksi pada data insert atau update
   */
  openDialogData(data = masterItemInit, action = Action.INSERT) {
    const dialogRef = this.dialog.open(MasterItemDialogComponent, {
      width: (action === Action.DELETE)
        ? '250px'
        : ((action === Action.INSERT || action === Action.UPDATE) ? '900px' : '500px'),
      data: {
        action: action, data: data,
        disables: {...masterItemDisables, kategori: true, unit: true, subKategori: true}
      },
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
