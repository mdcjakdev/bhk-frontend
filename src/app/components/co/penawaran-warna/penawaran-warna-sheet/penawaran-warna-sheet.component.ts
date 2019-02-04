import {ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatDialog, MatSnackBar} from '@angular/material';
import {MasterSupplierService} from '../../../../services/master/master-supplier/master-supplier.service';
import {PenawaranWarnaService} from '../../../../services/co/penawaran-warna.service';
import {AppHttpGenerate} from '../../../../shared/http-generate';
import {formFieldAppearanceSet, openAppSnackbar, SNACKBAR_SUCCESS_STYLE, SNACKBAR_WARNING_STYLE} from '../../../../shared/constants';
import {SelectLazy} from '../../../../shared/select-lazy';
import {Pengguna} from '../../../../inits/administrator/pengguna-init';
import {tipeIdentitas} from '../../../../inits/master/master-karyawan-init';
import {PemesananPembelianService} from '../../../../services/po/pemesanan-pembelian.service';
import {Ui} from '../../../../shared/ui';
import {PemesananPembelian, pemesananPembelianInit} from '../../../../inits/po/po-init';
import {
  PenawaranWarna,
  penawaranWarnaDetailInit,
  penawaranWarnaDetailWarnaInit,
  penawaranWarnaForm,
  penawaranWarnaInit
} from '../../../../inits/co/co-init';
import {PenawaranWarnaDialogInfoComponent} from '../penawaran-warna-dialog-info/penawaran-warna-dialog-info.component';
import {FormArray, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-penawaran-warna-sheet',
  templateUrl: './penawaran-warna-sheet.component.html',
  styleUrls: ['./penawaran-warna-sheet.component.scss']
})
export class PenawaranWarnaSheetComponent implements OnInit {

  formFieldAppearanceVendor = formFieldAppearanceSet.OUTLINE;
  documentProperties: AppHttpGenerate;

  tipeIdentitas = tipeIdentitas;
  waitingForLoadingPoAndDocumentData = false;
  failLoadDocumentPoAndDocumentProperties = false;

  dataPo: PemesananPembelian = pemesananPembelianInit;
  details: any[] = [];
  // poItems: any[] = [];
  // poItemsColors: any[] = [];

  @ViewChild('selectVendor') selectVendor;
  salesmanLazy: SelectLazy<Pengguna>;

  formCo = penawaranWarnaForm();

  constructor(private changeDetector: ChangeDetectorRef,
              private masterSupplierService: MasterSupplierService,
              private pemesananPembelianService: PemesananPembelianService,
              private penawaranWarnaService: PenawaranWarnaService,
              private bottomSheetRef: MatBottomSheetRef<PenawaranWarnaSheetComponent>,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {

    // // init untuk data salesman
    // this.salesmanLazy = new SelectLazy(
    //   this.form,
    //   'salesman',
    //   penggunaService.http,
    //   penggunaService.getData,
    //   data.data.salesman.uuid,
    //   this.isInsert());

    /** inisialisasi Generate properti dokumen seperti, nomor dokumen, prefix, counter dan tanggal PR dari server */
    this.documentProperties = new AppHttpGenerate(
      penawaranWarnaService.http,
      penawaranWarnaService.getDocumentProperties
    );
  }

  ngOnInit() {
    this.getPoByPoId();
  }

  getPoByPoId() {
    this.failLoadDocumentPoAndDocumentProperties = false;
    this.waitingForLoadingPoAndDocumentData = true;
    // jika data PO belum dibuatkan dokumen penawara warna
    if ((this.data.onCo !== undefined && !this.data.onCo) && this.data.poUuid) {
      Ui.blockUI('#co-wrapper', 0.7, 4, 0, 4);

      setTimeout(() => {
        this.pemesananPembelianService.getDataById(this.data.poUuid)
          .subscribe(
            (value: PemesananPembelian) => {
              this.dataPo = value;

              if (this.data.isInsert !== undefined && this.data.isInsert) {
                this.generateDocumentProperties();
              }

              this.changeDetector.detectChanges();
            },
            error => {
              Ui.unblockUI('#co-wrapper');
              this.failLoadDocumentPoAndDocumentProperties = true;
              this.waitingForLoadingPoAndDocumentData = false;

              this.changeDetector.detectChanges();
            }
          );
      }, 600);
    }
  }

  generateDocumentProperties() {
    this.documentProperties.generate(
      (value: any) => {

        this.generatePoAndDocumentValuesToForm();

        this.waitingForLoadingPoAndDocumentData = false;
        Ui.unblockUI('#co-wrapper');
        this.changeDetector.detectChanges();
      },
      error => {
        Ui.unblockUI('#co-wrapper');

        this.failLoadDocumentPoAndDocumentProperties = true;
        this.waitingForLoadingPoAndDocumentData = false;
        this.changeDetector.detectChanges();
      }
    );
  }


  generatePoAndDocumentValuesToForm(value = penawaranWarnaInit) {

    if (this.documentProperties.document) {
      value = {
        ...value,
        tanggalPenawaran: this.documentProperties.document.date,
        nomorDokumen: this.documentProperties.document.nomorDokumen,
        nomorPrefix: this.documentProperties.document.prefix,
        counter: this.documentProperties.document.counter
      };
    }

    if (this.dataPo) {
      const detail = this.dataPo.detail.map(v2 => {
        // this.details.push(v2); // item
        // this.poItemsColors.push(v2.detailWarna) // warna
        return {
          ...penawaranWarnaDetailInit,
          pemesananPembelianDetail: {uuid: v2.uuid},
          warna: v2.detailWarna.map(w1 => {
            return {
              ...penawaranWarnaDetailWarnaInit,
              pemesananPembelianDetailWarna: {...w1}
            };
          })
        };
      });

      value = {
        ...value,
        pemesananPembelian: {uuid: this.dataPo.uuid},
        detail: detail
      };
    }

    this.formCo = penawaranWarnaForm(value);
    this.details = [...(<PenawaranWarna>this.formCo.getRawValue()).detail];
    //
    //
    // this.waitingForLoadingPoAndDocumentData = false;
    // Ui.unblockUI('#co-wrapper');
    // this.changeDetector.detectChanges();
  }

  close() {
    this.bottomSheetRef.dismiss();
  }


  openDialogColorOffer(index = -1) {
    if (index < 0) {
      openAppSnackbar(this.snackBar, 'Terjadi Kesalahan...', SNACKBAR_WARNING_STYLE);
      return;
    }


    let formDetail: FormGroup;
    const countOfFormDetail = (<PenawaranWarna> this.formCo.getRawValue()).detail.length;
    if (index <= (countOfFormDetail - 1)) {
      formDetail = (<FormGroup> (<FormArray> this.formCo.controls['detail']).controls[index]);
    } else {
      formDetail = undefined;
    }

    // console.log(index, countOfFormDetail, formDetail)


    const dialogRef = this.dialog.open(PenawaranWarnaDialogInfoComponent, {
      width: '700px',
      data: {
        detail: {...this.details[index]},
        item: {...this.dataPo.detail[index].item},
        detailWarna: [...this.dataPo.detail[index].detailWarna],
        formDetail: formDetail
      },
      autoFocus: false,
      position: {bottom: '50px', top: '45px'}
    });


    // callback closing dari dialog
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        // console.log(result)
      }
    });

  }


  save() {
    if (this.formCo.valid) {

    }
  }
}
