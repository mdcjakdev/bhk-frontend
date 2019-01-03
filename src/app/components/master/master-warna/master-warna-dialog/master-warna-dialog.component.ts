import {Component, Inject, OnInit} from '@angular/core';
import {DialogUtil} from '../../../../shared/dialog-util';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {Ui} from '../../../../shared/ui';
import {first} from 'rxjs/operators';
import {SUCCESS, trimReactiveObject} from '../../../../shared/utils';
import {delayHttpRequest, openAppSnackbar, SNACKBAR_WARNING_STYLE} from '../../../../shared/constants';
import {MasterWarnaService} from '../../../../services/master/master-warna/master-warna.service';
import {defaultColor, masterWarnaBarcodeForm, masterWarnaErrorStateMatchers, masterWarnaForm} from '../../../../inits/master/master-warna';
import {FormArray, FormControl} from '@angular/forms';

@Component({
  selector: 'app-master-warna-dialog',
  templateUrl: './master-warna-dialog.component.html',
  styleUrls: ['./master-warna-dialog.component.scss']
})
export class MasterWarnaDialogComponent extends DialogUtil
  implements OnInit {

  close = undefined;
  color = defaultColor;
  toggle = false;
  colorControl = new FormControl(defaultColor);

  constructor(public snackBar: MatSnackBar,
              public masterWarnaService: MasterWarnaService,
              dialogRef: MatDialogRef<MasterWarnaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {
    super(dialogRef,
      data,
      masterWarnaForm(data.data),
      masterWarnaErrorStateMatchers);
  }

  ngOnInit() {
    this.colorControl = <FormControl> this.form.controls['kodeWarnaHexadecimal'];
    this.color = ((<string> this.colorControl.value).trim().length === 0) ? defaultColor : this.colorControl.value;
  }

  colorChanged(v) {
    this.colorControl.setValue(v);
  }

  addNewBarcode(fa) {
    this.reactiveFormUtil.addFormArray(masterWarnaBarcodeForm(), fa);
  }

  removeBarcode(fa, i) {
    this.reactiveFormUtil.removeFormArray(fa, i);
  }


  /**
   * Funsi yang digunakan untuk menyimpan data
   * @param value: data
   */
  save(value?): void {
    // jika tidak ada barcode yang di daftarkan
    if (this.barcodeCount() === 0 ) {
      openAppSnackbar(this.snackBar, 'Barcode belum anda inputkan ...', SNACKBAR_WARNING_STYLE);
      return;
    }

    this.dialogRef.disableClose = true;
    Ui.blockUI('#dialog-block', 0.5, 4, 0, 4);

    setTimeout(() => {
      this.masterWarnaService.postData(trimReactiveObject(value)).pipe(first()).subscribe(
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
    }, delayHttpRequest );
  }

  barcodeCount() {
    return (<FormArray> this.form.controls['barcode']).length;
  }


  /**
   * Funsi untuk melakukan hapus data ke server
   * @param uuid id data
   */
  delete(uuid?): void {
    this.dialogRef.disableClose = true;
    Ui.blockUI('#dialog-block', 0.5, 4, 0, 4);

    setTimeout(() => {
      this.masterWarnaService.deleteData(uuid).pipe(first()).subscribe(
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



}
