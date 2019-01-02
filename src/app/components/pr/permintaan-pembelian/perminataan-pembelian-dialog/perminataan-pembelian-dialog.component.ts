import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {DialogUtil} from '../../../../shared/dialog-util';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {Ui} from '../../../../shared/ui';
import {first} from 'rxjs/operators';
import {delayHttpRequest, openAppSnackbar} from '../../../../shared/constants';
import {AppErrorStateMatcher, SUCCESS} from '../../../../shared/utils';
import {ServerService} from '../../../../services/server.service';
import {PermintaanPembelianService} from '../../../../services/pr/permintaan-pembelian.service';
import {permintaanPembelianDisables, permintaanPembelianErrorStateMatchers, permintaanPembelianForm} from '../../../../inits/pr/pr-init';
import {FormControl, Validators} from '@angular/forms';
import {SelectLazy} from '../../../../shared/select-lazy';
import {Pengguna} from '../../../../inits/administrator/pengguna-init';
import {PenggunaService} from '../../../../services/administrator/pengguna/pengguna.service';
import {AppHttpGenerate} from '../../../../shared/http-generate';

@Component({
  selector: 'app-permintaan-pembelian-dialog',
  templateUrl: './perminataan-pembelian-dialog.component.html',
  styleUrls: ['./perminataan-pembelian-dialog.component.scss']
})
export class PermintaanPembelianDialogComponent extends DialogUtil
  implements OnInit {
  close = undefined;

  /** Index dari tab yang terpilih */
  selectedIndex = 0;

  /* Jika index/tab penginputan data permintaan pembelian telah di load(buka) */
  isPermintaanPembelianLoaded = false;


  /** Control validator untuk pemilihan jenis permintaan pembelian */
  jenisPermintaan = new FormControl(undefined, [Validators.required]);
  jenisPermintaanStateMatcher = new AppErrorStateMatcher();
  /**/

  @ViewChild('selectSalesman') selectSalesman;
  salesmanLazy: SelectLazy<Pengguna>;

  documentProperties: AppHttpGenerate;


  constructor(public snackBar: MatSnackBar,
              public serverService: ServerService,
              public penggunaService: PenggunaService,
              public permintaanPembelianService: PermintaanPembelianService,
              dialogRef: MatDialogRef<PermintaanPembelianDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {
    super(dialogRef,
      data,
      permintaanPembelianForm(data.data, data.disables),
      permintaanPembelianErrorStateMatchers);

    // init untuk data salesman
    this.salesmanLazy = new SelectLazy(
      this.form,
      'salesman',
      penggunaService.http,
      penggunaService.getData,
      data.data.salesman.uuid,
      this.isInsert());


    this.documentProperties = new AppHttpGenerate(
      permintaanPembelianService.http,
      permintaanPembelianService.getDocumentProperties,
      this.documentPropertiesSuccess
    )
  }


  documentPropertiesSuccess = (value: any) => {
    this.form.controls['tanggalPermintaan'].setValue(value['date']);
    this.form.controls['nomorDokumenPr'].setValue(value['nomorDokumen']);
    this.form.controls['counterPr'].setValue(value['counter']);
    this.form.controls['nomorPrefixPr'].setValue(value['prefix']);
  }


  generateDocumentProperties() {
    this.form.controls['tanggalPermintaan'].setValue('');
    this.form.controls['nomorDokumenPr'].setValue('');
    this.form.controls['counterPr'].setValue('');
    this.form.controls['nomorPrefixPr'].setValue('');

    this.documentProperties.generate();
  }


  onTabChanged(index) {
    if (index === 1) { // tab data permintaan pembelian

      if (!this.isPermintaanPembelianLoaded) { // hanya jika belum terbuka sama sekali
        // set element select of salesman
        this.salesmanLazy.select = this.selectSalesman;
        if (this.isInsert() || this.isUpdate()) {
          this.salesmanLazy._loadMore();
        }

        this.isPermintaanPembelianLoaded = true;
      }

      /* generate properti dokumen dari server */
      this.generateDocumentProperties();
    }


  }

  ngOnInit() {
    // set control jenis permintaan telah di klik
    this.jenisPermintaan.markAsTouched({onlySelf: true});
  }


  sebelumnyaCondition() {

  }

  selanjutnyaCondition() {
    if (this.selectedIndex === 0) {
      return this.jenisPermintaan.invalid;
    } else if (this.selectedIndex === 1) {
      if (this.isInsert()) {
        return (
          (this.documentProperties.waiting || this.documentProperties.failed) ||
          this.salesmanLazy.failToFetch ||
          this.form.invalid
        );
      } else {
        return (
          (this.documentProperties.waiting || this.documentProperties.failed) ||
          (!this.salesmanLazy.isUuidTrue) ||
          this.form.invalid
        );
      }
    } else {

    }
  }

  next() {
    this.selectedIndex++;
  }

  previous() {
    this.selectedIndex--;
  }

  /**
   * Funsi yang digunakan untuk menyimpan data
   * @param value: data
   */
  save(value?): void {
    this.dialogRef.disableClose = true;
    Ui.blockUI('#dialog-block', 0.5, 4, 0, 4);

    setTimeout(() => {
      this.permintaanPembelianService.postData(value).pipe(first()).subscribe(
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
      this.permintaanPembelianService.deleteData(uuid).pipe(first()).subscribe(
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
