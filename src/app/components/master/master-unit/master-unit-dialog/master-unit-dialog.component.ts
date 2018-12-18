import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogUtil} from '../../../../shared/dialog-util';
import {masterUnitErrorStateMatchers, masterUnitForm} from '../../../../inits/master/master-unit-init';
import {Ui} from '../../../../shared/ui';
import {MasterUnitService} from '../../../../services/master/master-unit/master-unit.service';
import {delayHttpRequest} from '../../../../shared/constants';
import {SUCCESS} from '../../../../shared/utils';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-master-unit-dialog',
  templateUrl: './master-unit-dialog.component.html',
  styleUrls: ['./master-unit-dialog.component.scss']
})
export class MasterUnitDialogComponent
  extends DialogUtil
  implements OnInit {

  close = undefined;

  constructor(public masterUnitService: MasterUnitService,
              dialogRef: MatDialogRef<MasterUnitDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {
    super(dialogRef,
      data,
      masterUnitForm(),
      masterUnitErrorStateMatchers);
  }

  /**
   * Funsi yang digunakan untuk menyimpan data
   * @param value: data
   */
  save(value?): void {
    this.dialogRef.disableClose = true;
    Ui.blockUI('#dialog-block', 0.5, 0, 0);

    setTimeout(() => {
      this.masterUnitService.postData(value).pipe(first()).subscribe(
        value1 => {
          this.dialogRef.disableClose = false;
          Ui.unblockUI('#dialog-block');
          this.dialogRef.close({...this.data, data: SUCCESS });
        },
        error1 => {
          this.dialogRef.disableClose = false;
          Ui.unblockUI('#dialog-block');
        }
      );
    }, delayHttpRequest);
  }


  /**
   * Funsi untuk melakukan hapus data ke server
   * @param uuid id data
   */
  delete(uuid?): void {
    this.dialogRef.disableClose = true;
    Ui.blockUI('#dialog-block', 0.5, 0, 0);

    setTimeout(() => {
      this.masterUnitService.deleteData(uuid).pipe(first()).subscribe(
        value1 => {
          this.dialogRef.disableClose = false;
          Ui.unblockUI('#dialog-block');
          this.dialogRef.close({...this.data, data: SUCCESS });
        },
        error1 => {
          this.dialogRef.disableClose = false;
          Ui.unblockUI('#dialog-block');
        }
      );
    }, delayHttpRequest);
  }

  ngOnInit() {
  }

}
