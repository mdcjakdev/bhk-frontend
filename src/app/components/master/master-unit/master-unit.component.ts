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


@Component({
  selector: 'app-master-unit',
  templateUrl: './master-unit.component.html',
  styleUrls: ['./master-unit.component.scss']
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
    displayedHeaders: ['No', 'Nama', 'Deskripsi'],
    levelsOnData: [['uuid'], ['name'], ['deskripsi']],
    isStringDataTypes: [true, true, true]
  };
  private selectedValue: any;


  constructor(private masterUnitHttpService: MasterUnitService,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {
    super(changeDetectorRef, media);
  }


  ngOnInit() {
    this.dataSource = new AppTableDataSource([], this.tableProperties, this.paginator, this.sort);
    this.getData();
  }

  callbackGetDataError = (error) => {
    // console.log(error);
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
  getData = () => this.serviceGetData(this.masterUnitHttpService.getData(), this.callbackGetDataSuccess, this.callbackGetDataError);


  onTableRightClicked = (event, row) => {
    this.selectedValue = row;
    this.showTableMenuOnRightClick(event, this.menuData);
  }


  /**
   * Untuk Aksi pada data insert atau update
   */
  openDialogData(data?, action = Action.INSERT) {
    const dialogRef = this.dialog.open(MasterUnitDialogComponent, {
      width: (action === Action.DELETE) ? '250px' : '400px',
      data: {action: action, data: data},
      autoFocus: false,
      position: { top: '100px', bottom: '50px' }
    });

    // callback closing dari dialog
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        // if (result.action === Action.INSERT || result.action === Action.UPDATE) {
          this.getData();
        // }
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