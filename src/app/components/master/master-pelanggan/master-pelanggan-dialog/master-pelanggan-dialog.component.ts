import {Component, Inject, OnInit} from '@angular/core';
import {DialogUtil} from '../../../../shared/dialog-util';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {Ui} from '../../../../shared/ui';
import {first} from 'rxjs/operators';
import {SUCCESS, trimReactiveObject} from '../../../../shared/utils';
import {delayHttpRequest, openAppSnackbar} from '../../../../shared/constants';
import {masterPelangganErrorStateMatchers, masterPelangganForm, tipePelanggan} from '../../../../inits/master/master-pelanggan-init';
import {MasterPelangganService} from '../../../../services/master/master-pelanggan/master-pelanggan.service';

@Component({
  selector: 'app-master-pelanggan-dialog',
  templateUrl: './master-pelanggan-dialog.component.html',
  styleUrls: ['./master-pelanggan-dialog.component.scss']
})
export class MasterPelangganDialogComponent extends DialogUtil
  implements OnInit {

  tipePelanggan = tipePelanggan;
  close = undefined;
  public mask = ['(', '+', '6', '2', ')', ' ', /[1-9]/, /\d/, /\d/, '-', /\d/, /\d/,  /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  hpMasking = {
    mask: this.mask,
    guide: false,
    placeholderChar: '\u2000'
  };

  public maskFax = ['(', '0', /[1-9]/, /\d/, ')', ' ',
    /\d/, /\d/, /\d/, /\d/,  /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  faxAndPhoneMasking = {
    mask: this.maskFax,
    guide: false,
    placeholderChar: '\u2000'
  };

  constructor(public snackBar: MatSnackBar,
              public masterPelangganService: MasterPelangganService,
              dialogRef: MatDialogRef<MasterPelangganDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {
    super(dialogRef,
      data,
      masterPelangganForm(data.data),
      masterPelangganErrorStateMatchers);
  }
  
  /**
   * Funsi yang digunakan untuk menyimpan data
   * @param value: data
   */
  save(value?): void {
    this.dialogRef.disableClose = true;
    Ui.blockUI('#dialog-block', 0.5, 4, 0, 4);

    setTimeout(() => {
      this.masterPelangganService.postData(trimReactiveObject(value)).pipe(first()).subscribe(
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
      this.masterPelangganService.deleteData(uuid).pipe(first()).subscribe(
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
