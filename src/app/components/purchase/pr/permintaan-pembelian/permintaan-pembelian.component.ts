import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ComponentUtil} from '../../../../shared/component-util';
import {AppTableDataSource} from '../../../../shared/table-data-source';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatDialog, MatSnackBar} from '@angular/material';
import {invertColor, openAppSnackbar, SNACKBAR_ERROR_STYLE} from '../../../../shared/constants';
import {ERROR_STATUS_CODE_0} from '../../../../shared/system-error-messages';
import {Action} from '../../../../shared/action.enum';
import {Ui} from '../../../../shared/ui';
import {PermintaanPembelianDialogComponent} from './perminataan-pembelian-dialog/perminataan-pembelian-dialog.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PermintaanPembelianService} from '../../../../services/purchase/pr/permintaan-pembelian.service';
import {permintaanPembelianDisables, permintaanPembelianInit} from '../../../../inits/purchase/pr/pr-init';
import {DashboardSharedService} from '../../../../services/dashboard-shared.service';
import {penggunaInit} from '../../../../inits/administrator/pengguna-init';
import {qualifyObject} from '../../../../shared/utils';

@Component({
  selector: 'app-permintaan-pembelian',
  templateUrl: './permintaan-pembelian.component.html',
  styleUrls: ['./permintaan-pembelian.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class PermintaanPembelianComponent
  extends ComponentUtil<AppTableDataSource>
  implements OnInit {

  invertColor = invertColor;

  /**
   * Kumpulan array dari nama-nama property data yang di peroleh dari
   * @var receivedData, yang akan ditampilkan pada data tabel
   */
  tableProperties = {
    displayedColumns: ['uuid', 'nomorPrefixPr', 'nomorDokumenPr', 'salesman', 'tanggalPermintaan'],
    displayedHeaders: ['No', 'Prefix', 'Nomor Dokumen', 'Salesman', 'Tangggal Permintaan'],
    levelsOnData: [
      ['uuid'],
      ['nomorPrefixPr'],
      ['nomorDokumenPr'],
      ['salesman', 'karyawan', 'nama'],
      ['tanggalPermintaan']
    ],
    isStringDataTypes: [true, true, true, true, true]
  };
  selectedValue: any = null;
  private isRightClick;


  constructor(
    public bhkSharedService: DashboardSharedService,
    private permintaanPembelianService: PermintaanPembelianService,
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
    this.serviceGetData(this.permintaanPembelianService.getData(page, size), this.callbackGetDataSuccess, this.callbackGetDataError);


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
  openDialogData(data = permintaanPembelianInit, action = Action.INSERT) {
    const dialogRef = this.dialog.open(PermintaanPembelianDialogComponent, {
      width: (action === Action.DELETE)
        ? '250px'
        : ((action === Action.INSERT || action === Action.UPDATE) ? '70%' : '500px'),
      data: {
        action: action,
        data: {
          ...data,
          prApprovedBy: qualifyObject(data, 'prApprovedBy', penggunaInit),
          prCancelledBy: qualifyObject(data, 'prCancelledBy', penggunaInit)
        },
        disables: permintaanPembelianDisables
      },
      autoFocus: false,
      position: {bottom: '50px', top: (action === Action.DELETE) ? '150px' : '45px'}
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
