import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DialogUtil} from '../../../../shared/dialog-util';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormGroup} from '@angular/forms';
import {Ui} from '../../../../shared/ui';
import {first} from 'rxjs/operators';
import {delayHttpRequest, openAppSnackbar} from '../../../../shared/constants';
import {SUCCESS} from '../../../../shared/utils';
import {PenggunaService} from '../../../../services/administrator/pengguna/pengguna.service';
import {MasterKaryawanService} from '../../../../services/master/master-karyawan/master-karyawan.service';
import {penggunaErrorStateMatchers, penggunaForm} from '../../../../inits/administrator/pengguna-init';

@Component({
  selector: 'app-pengguna-dialog',
  templateUrl: './pengguna-dialog.component.html',
  styleUrls: ['./pengguna-dialog.component.scss']
})
export class PenggunaDialogComponent extends DialogUtil
  implements OnInit, OnDestroy {

  close = undefined;

  hidePassword = true;

  dataKaryawan: any[] = [];
  @ViewChild('selectKaryawan') selectKaryawan;
  karyawanPage = 0;
  waitingLoadMoreKaryawan = false;
  isLastKaryawan = false;
  isKaryawanUuidTrue = false;
  karyawanFailToFetch = false;


  constructor(public snackBar: MatSnackBar,
              public penggunaService: PenggunaService,
              public masterKaryawanService: MasterKaryawanService,
              dialogRef: MatDialogRef<PenggunaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {
    super(dialogRef,
      data,
      penggunaForm(data.data, data.disables),
      penggunaErrorStateMatchers);
  }

  ngOnDestroy(): void {
  }

  ngOnInit() {
    if (this.isInsert() || this.isUpdate()) {
      this._loadMoreKaryawan();
    }
  }

  isKaryawanEnabled() {
    return !(<FormGroup> this.form.controls['karyawan']).controls['uuid'].disabled;
  }

  simpanButtonCondition(formCondition) {
    if (this.isInsert()) {
      return !formCondition;
    } else {
      return !(this.isKaryawanUuidTrue && formCondition);
    }
  }

  refreshKaryawan() {
    this.karyawanFailToFetch = false;
    this.waitingLoadMoreKaryawan = false;
    this.loadMoreKaryawan();
  }

  loadMoreKaryawan() {
    this.selectKaryawan.open();
    if (!this.waitingLoadMoreKaryawan) {
      // ubah jadi status menunggu proses load lokasi selesai jadi true
      this.waitingLoadMoreKaryawan = true;
      setTimeout(() => {
        this._loadMoreKaryawan();
      }, 0);
    }
  }

  _loadMoreKaryawan() {
    setTimeout(() => {
      this.masterKaryawanService.getData(this.karyawanPage, 3).subscribe(
        (value: any) => {
          this.karyawanPage++;
          if (value !== undefined && value.content !== undefined) {
            const d = value.content;
            if (d !== undefined) {
              this.dataKaryawan = [...this.dataKaryawan];
              d.forEach(v => {
                this.dataKaryawan.push(v);

                // mengubah status pengambilan karyawan apakah sudah ditemukan atau belum
                if (!this.isKaryawanUuidTrue) {
                  this.isKaryawanUuidTrue = this.data.data['karyawan'].uuid === v.uuid;
                }

                if (this.isInsert()) {
                  (<FormGroup> this.form.controls['karyawan']).controls['uuid'].enable();
                } else if (this.isUpdate()) {
                  if (this.isKaryawanUuidTrue) {
                    (<FormGroup> this.form.controls['karyawan']).controls['uuid'].enable();
                  } else {
                    (<FormGroup> this.form.controls['karyawan']).controls['uuid'].disable();
                  }
                }

              });
              this.isLastKaryawan = value.last;

              // jika proses update, load trs datanya sampai dengan sama lokasi dari data yang akan diupdate
              if (!this.isLastKaryawan && this.isUpdate() && !this.isKaryawanUuidTrue) {
                this._loadMoreKaryawan();
              }
            }
          }
          this.waitingLoadMoreKaryawan = false;


        },
        error => {
          this.karyawanFailToFetch = true;
        }
      );
    }, 0)
  }



  /**
   * Funsi yang digunakan untuk menyimpan data
   * @param value: data
   */
  save(value?): void {
    this.dialogRef.disableClose = true;
    Ui.blockUI('#dialog-block', 0.5, 4, 0, 4);

    setTimeout(() => {
      this.penggunaService.postData(value).pipe(first()).subscribe(
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
