import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ComponentUtil} from '../../../shared/component-util';
import {AppTableDataSource} from '../../../shared/table-data-source';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ERROR_STATUS_CODE_0} from '../../../shared/system-error-messages';
import {Action} from '../../../shared/action.enum';
import {Ui} from '../../../shared/ui';
import {MasterWarnaService} from '../../../services/master/master-warna/master-warna.service';
import {masterWarnaInit} from '../../../inits/master/master-warna';
import {MasterWarnaDialogComponent} from './master-warna-dialog/master-warna-dialog.component';

@Component({
  selector: 'app-master-warna',
  templateUrl: './master-warna.component.html',
  styleUrls: ['./master-warna.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MasterWarnaComponent
  extends ComponentUtil<AppTableDataSource>
  implements OnInit {

  /**
   * Kumpulan array dari nama-nama property data yang di peroleh dari
   * @var receivedData, yang akan ditampilkan pada data tabel
   */
  tableProperties = {
    displayedColumns: ['uuid', 'namaWarna', 'kodeWarna'],
    displayedHeaders: ['No', 'Nama Warna', 'Kode Warna'],
    levelsOnData: [['uuid'], ['namaWarna'], ['kodeWarna']],
    isStringDataTypes: [true, true, true]
  };
  selectedValue: any = null;
  private isRightClick;


  constructor(private masterWarnaService: MasterWarnaService,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {
    super(changeDetectorRef, media);
  }


  /** menghilangkan hover style pada row jika menu telah tertutup */
  tableMenuRightClickOnClose(event) {
    this.selectedValue = null;
    super.tableMenuRightClickOnClose(event);
  }

  ngOnInit() {
    this.dataSource = new AppTableDataSource([], this.tableProperties, this.paginator, this.sort);
    this.getData();
  }

  callbackGetDataError = (error) => {
    if (error.status === 0) {
      this.snackBar.open(ERROR_STATUS_CODE_0, '', {
        duration: 3000,
        panelClass: 'default-snackbar'
      });
    } else {
      this.snackBar.open(error.error.message, '', {
        duration: 3000,
        panelClass: 'default-snackbar'
      });
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
  getData = () => this.serviceGetData(this.masterWarnaService.getData(), this.callbackGetDataSuccess, this.callbackGetDataError);


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
  openDialogData(data = masterWarnaInit, action = Action.INSERT) {
    const dialogRef = this.dialog.open(MasterWarnaDialogComponent, {
      width: (action === Action.DELETE) ? '250px' : '500px',
      data: {action: action, data: data},
      autoFocus: false,
      position: { bottom: '50px', top: (action === Action.DELETE) ? '150px' : '50px' }
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
