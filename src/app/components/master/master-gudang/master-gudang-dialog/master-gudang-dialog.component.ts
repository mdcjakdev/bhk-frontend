import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {DialogUtil} from '../../../../shared/dialog-util';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import * as moment from 'moment';
import {DATE_PATTERN} from '../../../../shared/app-date-adapter';
import {Ui} from '../../../../shared/ui';
import {first} from 'rxjs/operators';
import {SUCCESS} from '../../../../shared/utils';
import {delayHttpRequest} from '../../../../shared/constants';
import {MasterGudangService} from '../../../../services/master/master-gudang/master-gudang.service';
import {masterGudangErrorStateMatchers, masterGudangForm} from '../../../../inits/master/master-gudang-init';
import {MasterLokasiService} from '../../../../services/master/master-lokasi/master-lokasi.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-master-gudang-dialog',
  templateUrl: './master-gudang-dialog.component.html',
  styleUrls: ['./master-gudang-dialog.component.scss']
})
export class MasterGudangDialogComponent extends DialogUtil
  implements OnInit {

  close = undefined;

  dataLokasi: any[] = [];

  @ViewChild('selectLokasi') selectLokasi;
  lokasiPage = 0;
  waitingLoadMoreLokasi = false;
  isLastLokasi = false;
  isLokasiUuidTrue = false;
  cek = false;


  constructor(public masterGudangService: MasterGudangService,
              public masterLokasiService: MasterLokasiService,
              dialogRef: MatDialogRef<MasterGudangDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {
    super(dialogRef,
      data,
      masterGudangForm(data.data, data.disables),
      masterGudangErrorStateMatchers);
  }


  ngOnInit() {
    if (this.isInsert() || this.isUpdate()) {
      this._loadMoreLokasi();
    }
  }

  isLokasiEnabled() {
    return !(<FormGroup> this.form.controls['lokasi']).controls['uuid'].disabled;
  }

  simpanButtonCondition(formCondition) {
    if (this.isInsert()) {
      return !formCondition;
    } else {
      return !(this.isLokasiUuidTrue && formCondition);
    }
  }

  loadMoreLokasi() {
    this.selectLokasi.open();
    if (!this.waitingLoadMoreLokasi) {
      // ubah jadi status menunggu proses load lokasi selesai jadi true
      this.waitingLoadMoreLokasi = true;
      setTimeout(() => {
        this._loadMoreLokasi();
      }, 0);
    }
  }

  _loadMoreLokasi() {
    setTimeout(() => {
      this.masterLokasiService.getData(this.lokasiPage, 3).subscribe(
        (value: any) => {
          this.lokasiPage++;
          if (value !== undefined && value.content !== undefined) {
            const d = value.content;
            if (d !== undefined) {
              this.dataLokasi = [...this.dataLokasi];
              d.forEach(v => {
                this.dataLokasi.push(v);

                // mengubah status pengambilan lokasi apakah sudah ditemukan atau belum
                if (!this.isLokasiUuidTrue) {
                  this.isLokasiUuidTrue = this.data.data.lokasi.uuid === v.uuid;
                }

                if (this.isInsert()) {
                  (<FormGroup> this.form.controls['lokasi']).controls['uuid'].enable();
                } else if (this.isUpdate()) {
                  if (this.isLokasiUuidTrue) {
                    (<FormGroup> this.form.controls['lokasi']).controls['uuid'].enable();
                  } else {
                    (<FormGroup> this.form.controls['lokasi']).controls['uuid'].disable();
                  }
                }

              });
              this.isLastLokasi = value.last;

              // jika proses update, load trs datanya sampai dengan sama lokasi dari data yang akan diupdate
              if (!this.isLastLokasi && this.isUpdate() && !this.isLokasiUuidTrue) {
                this._loadMoreLokasi();
              }
            }
          }
          this.waitingLoadMoreLokasi = false;


        },
        error => {

        }
      );
    }, 0)
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
      this.masterGudangService.postData(value).pipe(first()).subscribe(
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
      this.masterGudangService.deleteData(uuid).pipe(first()).subscribe(
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


}
