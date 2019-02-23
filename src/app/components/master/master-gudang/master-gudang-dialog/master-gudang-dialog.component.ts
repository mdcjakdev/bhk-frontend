import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {DialogUtil} from '../../../../shared/dialog-util';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import * as moment from 'moment';
import {DATE_PATTERN} from '../../../../shared/app-date-adapter';
import {Ui} from '../../../../shared/ui';
import {first} from 'rxjs/operators';
import {SUCCESS, trimReactiveObject} from '../../../../shared/utils';
import {delayHttpRequest, openAppSnackbar} from '../../../../shared/constants';
import {MasterGudangService} from '../../../../services/master/master-gudang/master-gudang.service';
import {masterGudangErrorStateMatchers, masterGudangForm, tipeGudang} from '../../../../inits/master/master-gudang-init';
import {MasterLokasiService} from '../../../../services/master/master-lokasi/master-lokasi.service';
import {SelectLazy} from '../../../../shared/select-lazy';
import {MasterLokasi} from '../../../../inits/master/master-lokasi-init';

@Component({
  selector: 'app-master-gudang-dialog',
  templateUrl: './master-gudang-dialog.component.html',
  styleUrls: ['./master-gudang-dialog.component.scss']
})
export class MasterGudangDialogComponent extends DialogUtil
  implements OnInit, AfterViewInit {

  close = undefined;
  tipeGudang = tipeGudang;

  public maskFax = ['(', '0', /[1-9]/, /\d/, ')', ' ',
    /\d/, /\d/, /\d/, /\d/,  /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  faxAndPhoneMasking = {
    mask: this.maskFax,
    guide: false,
    placeholderChar: '\u2000'
  };

  @ViewChild('selectLokasi') selectLokasi;
  lokasiLazy: SelectLazy<MasterLokasi>;


  constructor(public snackBar: MatSnackBar,
              public masterGudangService: MasterGudangService,
              public masterLokasiService: MasterLokasiService,
              dialogRef: MatDialogRef<MasterGudangDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {
    super(dialogRef,
      data,
      masterGudangForm(data.data, data.disables),
      masterGudangErrorStateMatchers);

    const f = new FileReader();


    // init untuk data lokasi
    this.lokasiLazy = new SelectLazy(
      this.form,
      'lokasi',
      masterLokasiService.http,
      masterLokasiService.getData,
      data.data.lokasi.uuid,
      this.isInsert());
  }

  ngAfterViewInit(): void {
    // init select komponent dari lokasi
    this.lokasiLazy.select = this.selectLokasi;
  }



  ngOnInit() {

    if (this.isInsert() || this.isUpdate()) {
      this.lokasiLazy._loadMore();
    }
  }


  simpanButtonCondition(formCondition) {
    if (this.lokasiLazy.waitingLoadMore) {
      return true;
    }

    if (this.isInsert()) {
      return !(formCondition && !this.lokasiLazy.failToFetch);
    } else {
      return !(this.lokasiLazy.isUuidTrue && formCondition);
    }
  }



  date(v) {
    moment.locale('id');
    return moment(v).format(DATE_PATTERN);
  }


  getTipeGudang(value) {
    for (const tipe of tipeGudang) {
      if (tipe.value === value) {
        return tipe.display;
      }
    }

    return 'Unknown'
  }


  /**
   * Funsi yang digunakan untuk menyimpan data
   * @param value: data
   */
  save(value?): void {
    // console.log(value)

    this.dialogRef.disableClose = true;
    Ui.blockUI('#dialog-block', 0.5, 4, 0, 4);

    setTimeout(() => {
      this.masterGudangService.postData(trimReactiveObject(value, ['tanggalMulai'])).pipe(first()).subscribe(
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
      this.masterGudangService.deleteData(uuid).pipe(first()).subscribe(
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
