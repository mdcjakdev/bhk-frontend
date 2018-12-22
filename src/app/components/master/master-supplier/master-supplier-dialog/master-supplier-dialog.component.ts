import {Component, Inject, OnInit} from '@angular/core';
import {DialogUtil} from '../../../../shared/dialog-util';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {masterSubCategoryForm} from '../../../../inits/master/master-category-init';
import {Ui} from '../../../../shared/ui';
import {first} from 'rxjs/operators';
import {SUCCESS} from '../../../../shared/utils';
import {delayHttpRequest} from '../../../../shared/constants';
import {masterSupplierErrorStateMatchers, masterSupplierForm} from '../../../../inits/master/master-supplier';
import {MasterSupplierService} from '../../../../services/master/master-supplier/master-supplier.service';
import * as moment from 'moment';
import {DATE_PATTERN} from '../../../../shared/app-date-adapter';

@Component({
  selector: 'app-master-supplier-dialog',
  templateUrl: './master-supplier-dialog.component.html',
  styleUrls: ['./master-supplier-dialog.component.scss']
})
export class MasterSupplierDialogComponent extends DialogUtil
  implements OnInit {

  close = undefined;

  constructor(public masterSupplier: MasterSupplierService,
              dialogRef: MatDialogRef<MasterSupplierDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {
    super(dialogRef,
      data,
      masterSupplierForm(data.data),
      masterSupplierErrorStateMatchers);
  }


  date(v) {
    moment.locale('id');
    return moment(v).format(DATE_PATTERN);
  }

  /**
   * Funsi yang digunakan untuk menyimpan data
   * @param value: data
   */
  save(value?): void {
    this.dialogRef.disableClose = true;
    Ui.blockUI('#dialog-block', 0.5, 4, 0, 4);

    setTimeout(() => {
      this.masterSupplier.postData(value).pipe(first()).subscribe(
        value1 => {
          this.dialogRef.disableClose = false;
          Ui.unblockUI('#dialog-block');
          this.dialogRef.close({...this.data, data: SUCCESS});
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
    Ui.blockUI('#dialog-block', 0.5, 4, 0, 4);

    setTimeout(() => {
      this.masterSupplier.deleteData(uuid).pipe(first()).subscribe(
        value1 => {
          this.dialogRef.disableClose = false;
          Ui.unblockUI('#dialog-block');
          this.dialogRef.close({...this.data, data: SUCCESS});
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
