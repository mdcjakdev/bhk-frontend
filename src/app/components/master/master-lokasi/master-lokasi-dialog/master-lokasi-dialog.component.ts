import {Component, Inject, OnInit} from '@angular/core';
import {DialogUtil} from '../../../../shared/dialog-util';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {Ui} from '../../../../shared/ui';
import {first} from 'rxjs/operators';
import {SUCCESS, trimReactiveObject} from '../../../../shared/utils';
import {delayHttpRequest, openAppSnackbar} from '../../../../shared/constants';
import {masterLokasiErrorStateMatchers, masterLokasiForm, tipeLokasi} from '../../../../inits/master/master-lokasi-init';
import {MasterLokasiService} from '../../../../services/master/master-lokasi/master-lokasi.service';

@Component({
  selector: 'app-master-lokasi-dialog',
  templateUrl: './master-lokasi-dialog.component.html',
  styleUrls: ['./master-lokasi-dialog.component.scss']
})
export class MasterLokasiDialogComponent extends DialogUtil
  implements OnInit {

  close = undefined;
  tipeLokasi = tipeLokasi;

  constructor(public snackBar: MatSnackBar,
              public masterLokasiService: MasterLokasiService,
              dialogRef: MatDialogRef<MasterLokasiDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {
    super(dialogRef,
      data,
      masterLokasiForm(data.data),
      masterLokasiErrorStateMatchers);
  }

  /**
   * Funsi yang digunakan untuk menyimpan data
   * @param value: data
   */
  save(value?): void {
    this.dialogRef.disableClose = true;
    Ui.blockUI('#dialog-block', 0.5, 4, 0, 4);

    setTimeout(() => {
      this.masterLokasiService.postData(trimReactiveObject(value)).pipe(first()).subscribe(
        value1 => {
          this.dialogRef.disableClose = false;
          Ui.unblockUI('#dialog-block');
          openAppSnackbar(this.snackBar, 'Berhasil ');
          this.dialogRef.close({...this.data, data: SUCCESS});
        },
        error1 => {
          if (error1.status === 401) {
            this.dialogRef.close();
          }
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
      this.masterLokasiService.deleteData(uuid).pipe(first()).subscribe(
        value1 => {
          this.dialogRef.disableClose = false;
          Ui.unblockUI('#dialog-block');
          openAppSnackbar(this.snackBar, 'Berhasil dihapus');
          this.dialogRef.close({...this.data, data: SUCCESS});
        },
        error1 => {
          if (error1.status === 401) {
            this.dialogRef.close();
          }
          this.dialogRef.disableClose = false;
          Ui.unblockUI('#dialog-block');
        }
      );
    }, delayHttpRequest);
  }

  ngOnInit() {
  }

}
