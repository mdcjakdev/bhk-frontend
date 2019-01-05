import {AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DialogUtil} from '../../../../shared/dialog-util';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {Ui} from '../../../../shared/ui';
import {first} from 'rxjs/operators';
import {delayHttpRequest, openAppSnackbar} from '../../../../shared/constants';
import {SUCCESS, trimReactiveObject} from '../../../../shared/utils';
import {PenggunaService} from '../../../../services/administrator/pengguna/pengguna.service';
import {MasterKaryawanService} from '../../../../services/master/master-karyawan/master-karyawan.service';
import {penggunaErrorStateMatchers, penggunaForm} from '../../../../inits/administrator/pengguna-init';
import {SelectLazy} from '../../../../shared/select-lazy';
import {MasterKaryawan} from '../../../../inits/master/master-karyawan-init';

@Component({
  selector: 'app-pengguna-dialog',
  templateUrl: './pengguna-dialog.component.html',
  styleUrls: ['./pengguna-dialog.component.scss']
})
export class PenggunaDialogComponent extends DialogUtil
  implements OnInit, AfterViewInit, OnDestroy {

  close = undefined;
  hidePassword = true;

  @ViewChild('selectKaryawan') selectKaryawan;
  karyawanLazy: SelectLazy<MasterKaryawan>;


  constructor(public snackBar: MatSnackBar,
              public penggunaService: PenggunaService,
              public masterKaryawanService: MasterKaryawanService,
              dialogRef: MatDialogRef<PenggunaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {
    super(dialogRef,
      data,
      penggunaForm(data.data, data.disables),
      penggunaErrorStateMatchers);

    // init untuk data karyawan
    this.karyawanLazy = new SelectLazy(
      this.form,
      'karyawan',
      masterKaryawanService.http,
      masterKaryawanService.getData,
      data.data.karyawan.uuid,
      this.isInsert());
  }

  ngOnDestroy(): void {
  }

  simpanButtonCondition(formCondition) {
    if (this.karyawanLazy.waitingLoadMore) {
      return true;
    }

    if (this.isInsert()) {
      return !(formCondition && !this.karyawanLazy.failToFetch);
    } else {
      return !(this.karyawanLazy.isUuidTrue && formCondition);
    }
  }

  ngAfterViewInit(): void {
    this.karyawanLazy.select = this.selectKaryawan;
  }


  ngOnInit() {
    if (this.isInsert() || this.isUpdate()) {
      this.karyawanLazy._loadMore();
    }
  }



  /**
   * Funsi yang digunakan untuk menyimpan data
   * @param value: data
   */
  save(value?): void {
    this.dialogRef.disableClose = true;
    Ui.blockUI('#dialog-block', 0.5, 4, 0, 4);

    setTimeout(() => {
      this.penggunaService.postData(trimReactiveObject(value)).pipe(first()).subscribe(
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
      this.penggunaService.deleteData(uuid).pipe(first()).subscribe(
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
