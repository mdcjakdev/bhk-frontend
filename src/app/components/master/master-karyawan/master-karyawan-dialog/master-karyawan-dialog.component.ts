import {Component, Inject, OnInit} from '@angular/core';
import {DialogUtil} from '../../../../shared/dialog-util';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {masterUnitErrorStateMatchers, masterUnitForm} from '../../../../inits/master/master-unit-init';
import {Ui} from '../../../../shared/ui';
import {first} from 'rxjs/operators';
import {delayHttpRequest, openAppSnackbar} from '../../../../shared/constants';
import {SUCCESS} from '../../../../shared/utils';
import {MasterKaryawanService} from '../../../../services/master/master-karyawan/master-karyawan.service';
import {masterKaryawanErrorStateMatchers, masterKaryawanForm, tipeIdentitas} from '../../../../inits/master/master-karyawan-init';

@Component({
  selector: 'app-master-karyawan-dialog',
  templateUrl: './master-karyawan-dialog.component.html',
  styleUrls: ['./master-karyawan-dialog.component.scss']
})
export class MasterKaryawanDialogComponent
  extends DialogUtil
  implements OnInit {

  tipeIdentitas = tipeIdentitas;
  close = undefined;

  constructor(public snackBar: MatSnackBar,
              public masterKaryawanService: MasterKaryawanService,
              dialogRef: MatDialogRef<MasterKaryawanDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {
    super(dialogRef,
      data,
      masterKaryawanForm(data.data),
      masterKaryawanErrorStateMatchers);
  }

  /**
   * Funsi yang digunakan untuk menyimpan data
   * @param value: data
   */
  save(value?): void {
    this.dialogRef.disableClose = true;
    Ui.blockUI('#dialog-block', 0.5, 4, 0, 4);

    setTimeout(() => {
      this.masterKaryawanService.postData(value).pipe(first()).subscribe(
        value1 => {
          this.dialogRef.disableClose = false;
          Ui.unblockUI('#dialog-block');
          openAppSnackbar(this.snackBar, 'Berhasil ');
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
      this.masterKaryawanService.deleteData(uuid).pipe(first()).subscribe(
        value1 => {
          this.dialogRef.disableClose = false;
          Ui.unblockUI('#dialog-block');
          openAppSnackbar(this.snackBar, 'Berhasil dihapus');
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
