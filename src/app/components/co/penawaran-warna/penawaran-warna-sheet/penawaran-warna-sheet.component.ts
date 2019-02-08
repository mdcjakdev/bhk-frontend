import {ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatDialog, MatSnackBar} from '@angular/material';
import {MasterSupplierService} from '../../../../services/master/master-supplier/master-supplier.service';
import {PenawaranWarnaService} from '../../../../services/co/penawaran-warna.service';
import {AppHttpGenerate} from '../../../../shared/http-generate';
import {delayHttpRequest, formFieldAppearanceSet, openAppSnackbar, SNACKBAR_WARNING_STYLE} from '../../../../shared/constants';
import {tipeIdentitas} from '../../../../inits/master/master-karyawan-init';
import {PemesananPembelianService} from '../../../../services/po/pemesanan-pembelian.service';
import {Ui} from '../../../../shared/ui';
import {PemesananPembelian, pemesananPembelianInit} from '../../../../inits/po/po-init';
import {
  PenawaranWarna,
  PenawaranWarnaDetail,
  penawaranWarnaDetailInit,
  PenawaranWarnaDetailWarna,
  penawaranWarnaDetailWarnaInit,
  penawaranWarnaErrorStateMatchers,
  penawaranWarnaForm,
  PenawaranWarnaInfo,
  penawaranWarnaInit
} from '../../../../inits/co/co-init';
import {PenawaranWarnaDialogInfoComponent} from '../penawaran-warna-dialog-info/penawaran-warna-dialog-info.component';
import {FormArray, FormGroup} from '@angular/forms';
import {ReactiveFormUtil} from '../../../../shared/reactive-form-util';
import {first} from 'rxjs/operators';
import {PenawaranWarnaDialogInfoDetailComponent} from '../penawaran-warna-dialog-info-detail/penawaran-warna-dialog-info-detail.component';
import {PenawaranWarnaConfirmationDialogComponent} from '../penawaran-warna-confirmation-dialog/penawaran-warna-confirmation-dialog.component';

@Component({
  selector: 'app-penawaran-warna-sheet',
  templateUrl: './penawaran-warna-sheet.component.html',
  styleUrls: ['./penawaran-warna-sheet.component.scss']
})
export class PenawaranWarnaSheetComponent implements OnInit {

  formValuesHasChanged = false;

  public reactiveFormUtil = new ReactiveFormUtil();
  formFieldAppearanceVendor = formFieldAppearanceSet.OUTLINE;
  documentProperties: AppHttpGenerate;

  tipeIdentitas = tipeIdentitas;
  waitingForLoadingPoAndDocumentData = false;
  failLoadDocumentPoAndDocumentProperties = false;

  stateMatcher = penawaranWarnaErrorStateMatchers;

  dataPo: PemesananPembelian = pemesananPembelianInit;
  dataCo: PenawaranWarna;
  details: any[] = [];
  whenListItemInfoClicked = false;

  @ViewChild('selectVendor') selectVendor;

  formCo = penawaranWarnaForm();

  constructor(private changeDetector: ChangeDetectorRef,
              private masterSupplierService: MasterSupplierService,
              private pemesananPembelianService: PemesananPembelianService,
              private penawaranWarnaService: PenawaranWarnaService,
              private bottomSheetRef: MatBottomSheetRef<PenawaranWarnaSheetComponent>,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {


    /** inisialisasi Generate properti dokumen seperti, nomor dokumen, prefix, counter dan tanggal PR dari server */
    this.documentProperties = new AppHttpGenerate(
      penawaranWarnaService.http,
      penawaranWarnaService.getDocumentProperties
    );
  }

  ngOnInit() {
    this.getPoByPoId();
  }

  onError() {
    Ui.unblockUI('#co-wrapper');
    this.failLoadDocumentPoAndDocumentProperties = true;
    this.waitingForLoadingPoAndDocumentData = false;

    this.changeDetector.detectChanges();
  }

  onSuccess() {
    this.failLoadDocumentPoAndDocumentProperties = false;
    this.waitingForLoadingPoAndDocumentData = false;
    Ui.unblockUI('#co-wrapper');
    this.changeDetector.detectChanges();
  }

  getPoByPoId() {
    this.failLoadDocumentPoAndDocumentProperties = false;
    this.waitingForLoadingPoAndDocumentData = true;
    // jika data PO belum dibuatkan dokumen penawara warna
    Ui.blockUI('#co-wrapper', 0.7, 4, 0, 4);

    setTimeout(() => {
      this.pemesananPembelianService.getDataById(this.data.poUuid)
        .subscribe(
          (value: PemesananPembelian) => {
            this.dataPo = value;

            if (this.data.onCo !== undefined && !this.data.onCo) {
              this.generateDocumentProperties();
            } else if (this.data.onCo !== undefined && this.data.onCo) {
              this.penawaranWarnaService.getByPoId(this.data.poUuid).subscribe(
                (co: any) => {
                  this.dataCo = co;
                  this.generatePoAndDocumentValuesToForm(co);
                  this.onSuccess();
                },
                error1 => this.onError()
              );
            }

            this.changeDetector.detectChanges();
          },
          error => this.onError()
        );
    }, 300);

  }

  generateDocumentProperties() {
    this.documentProperties.generate(
      (value: any) => {
        this.generatePoAndDocumentValuesToForm();
        this.onSuccess();
      },
      error => this.onError()
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
        /* Init nilai detail dari data Co yang sudah ada*/

        let initDetail: any = (this.data.onCo)
          ? this.dataCo.detail.filter(d1 => d1.pemesananPembelianDetail.uuid === v2.uuid).map(d2 => d2)
          : penawaranWarnaDetailInit;

        initDetail = (this.data.onCo) ? <PenawaranWarnaDetail>initDetail[0] : initDetail;

        return {
          ...initDetail,
          pemesananPembelianDetail: {uuid: v2.uuid},
          warna: v2.detailWarna.map(w1 => {

            let initDetailWarna: any | PenawaranWarnaDetailWarna = (this.data.onCo)
              ? initDetail.warna.filter(d1 => d1.pemesananPembelianDetailWarna.uuid === w1.uuid).map(d2 => d2)
              : penawaranWarnaDetailWarnaInit;

            initDetailWarna = (this.data.onCo) ? <PenawaranWarnaDetailWarna>initDetailWarna[0] : initDetailWarna;
            const info = (this.data.onCo) ? initDetailWarna.info.sort((pi1: PenawaranWarnaInfo, pi2: PenawaranWarnaInfo) => pi1.createdDate < pi2.createdDate ? 1 : -1) : [];

            return {
              ...initDetailWarna,
              pemesananPembelianDetailWarna: {...w1},
              info: [...info]
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


    this.formCo.valueChanges.subscribe(value1 => {
      if (!this.formValuesHasChanged) {
        this.formValuesHasChanged = true;
        this.changeDetector.detectChanges();
      }


    });

  }

  close(result?) {
    if (this.data.onCo && this.formValuesHasChanged) {
      const dialogRef = this.dialog.open(PenawaranWarnaConfirmationDialogComponent, {
        width: '300px',
        data: {message: 'Perubahan data belum disimpan. Simpan perubahan data?'},
        autoFocus: false,
        position: {bottom: '150px', top: '200px'}
      });

      dialogRef.afterClosed().subscribe(value => {

        if (value === undefined) {
          return;
        }

        if (value === 'ya') {
          this.waitingForLoadingPoAndDocumentData = true;
          this.changeDetector.detectChanges();

          this.formValuesHasChanged = !this.formValuesHasChanged;
          this.save(this.formCo.getRawValue(),
            value1 => this.changeDetector.detectChanges(),
            error1 => {
              this.formValuesHasChanged = !this.formValuesHasChanged;
              this.changeDetector.detectChanges();
            });

        } else if (value === 'tidak') {
          this.bottomSheetRef.dismiss();
        }

      });

    } else {
      this.bottomSheetRef.dismiss(result);
    }
  }


  /**
   * Funsi yang digunakan untuk menyimpan data
   * @param value: data
   */
  save(value = this.formCo.getRawValue(),
       success?: (value: any) => void, failed?: (error: any) => void, params?: any): void {
    // console.log(value)
    Ui.blockUI('#co-wrapper', 0.5, 4, 0, 4);
    this.waitingForLoadingPoAndDocumentData = true;

    setTimeout(() => {
      this.penawaranWarnaService.postData(value).pipe(first()).subscribe(
        value1 => {
          this.waitingForLoadingPoAndDocumentData = false;
          Ui.unblockUI('#co-wrapper');
          openAppSnackbar(this.snackBar, 'Berhasil ');

          if (success) {
            success(value1);
          }

          this.formValuesHasChanged = false;
          this.close('saved');
        },
        error1 => {
          if (failed) {
            failed(error1);
          }

          this.waitingForLoadingPoAndDocumentData = false;
          Ui.unblockUI('#co-wrapper');
        }
      );
    }, delayHttpRequest);
  }


  openDialogColorOffer(index = -1) {

    // jika hanya melihat info detail/informasi data
    if (!this.data.edit) {
      return;
    }

    setTimeout(() => {

      if (this.whenListItemInfoClicked) {
        return;
      }

      if (index < 0) {
        openAppSnackbar(this.snackBar, 'Terjadi Kesalahan...', SNACKBAR_WARNING_STYLE);
        return;
      }


      const dialogRef = this.dialog.open(PenawaranWarnaDialogInfoComponent, {
        width: '700px',
        disableClose: true,
        data: {
          detail: {...this.details[index]},
          item: {...this.dataPo.detail[index].item},
          detailWarna: [...this.dataPo.detail[index].detailWarna],
          formDetail: this.generateFormDetail(index)
        },
        autoFocus: false,
        position: {bottom: '50px', top: '45px'}
      });

      dialogRef.afterClosed().subscribe(value => this.changeDetector.detectChanges())

    }, 50);
  }


  generateFormDetail(index) {
    let formDetail: FormGroup;
    const countOfFormDetail = (<PenawaranWarna>this.formCo.getRawValue()).detail.length;
    if (index <= (countOfFormDetail - 1)) {
      formDetail = (<FormGroup>(<FormArray>this.formCo.controls['detail']).controls[index]);
    } else {
      formDetail = undefined;
    }

    return formDetail;
  }


  infoClicked(index = -1) {
    this.whenListItemInfoClicked = true;

    const dialogRef = this.dialog.open(PenawaranWarnaDialogInfoDetailComponent, {
      width: '700px',
      data: {
        detail: {...this.details[index]},
        item: {...this.dataPo.detail[index].item},
        detailWarna: [...this.dataPo.detail[index].detailWarna],
        formDetailValue: this.generateFormDetail(index).getRawValue()
      },
      autoFocus: false,
      position: {bottom: '50px', top: '45px'}
    });

    // callback closing dari dialog
    dialogRef.afterClosed().subscribe(result => {
      this.whenListItemInfoClicked = false;
    });

  }
}
