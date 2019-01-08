import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, QueryList, ViewChild} from '@angular/core';
import {DialogUtil} from '../../../../shared/dialog-util';
import {
  MAT_DIALOG_DATA,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger, MatDialog,
  MatDialogRef,
  MatSelect,
  MatSnackBar
} from '@angular/material';
import {Ui} from '../../../../shared/ui';
import {first} from 'rxjs/operators';
import {delayHttpRequest, openAppSnackbar, SNACKBAR_SUCCESS_STYLE, SNACKBAR_WARNING_STYLE} from '../../../../shared/constants';
import {AppErrorStateMatcher, SUCCESS} from '../../../../shared/utils';
import {PermintaanPembelianService} from '../../../../services/pr/permintaan-pembelian.service';
import {
  permintaanPembelianDetailDisables,
  permintaanPembelianDetailForm,
  permintaanPembelianDetailInit,
  PermintaanPembelianDetailWarna, permintaanPembelianDetailWarnaDisables,
  permintaanPembelianDetailWarnaForm,
  permintaanPembelianDetailWarnaInit,
  permintaanPembelianDisables,
  permintaanPembelianErrorStateMatchers,
  permintaanPembelianForm
} from '../../../../inits/pr/pr-init';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {SelectLazy} from '../../../../shared/select-lazy';
import {Pengguna} from '../../../../inits/administrator/pengguna-init';
import {PenggunaService} from '../../../../services/administrator/pengguna/pengguna.service';
import {AppHttpGenerate} from '../../../../shared/http-generate';
import {MasterItemService} from '../../../../services/master/master-item/master-item.service';
import {MasterItem} from '../../../../inits/master/master-item';
import {MasterWarna, masterWarnaForm} from '../../../../inits/master/master-warna';
import {Action} from '../../../../shared/action.enum';
import {PropertiWarnaComponent} from './properti-warna/properti-warna.component';


@Component({
  selector: 'app-permintaan-pembelian-dialog',
  templateUrl: './perminataan-pembelian-dialog.component.html',
  styleUrls: ['./perminataan-pembelian-dialog.component.scss']
})
export class PermintaanPembelianDialogComponent extends DialogUtil
  implements OnInit, AfterViewInit {
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

  itemLazy: SelectLazy<MasterItem>[] = [];
  warna: any[] = [];
  dataWarna: any[] = [];
  dataWarnaTrigger: MatAutocompleteTrigger[] = [];

  documentProperties: AppHttpGenerate;

  constructor(
    public dialog: MatDialog,
    private changeDetector: ChangeDetectorRef,
    public snackBar: MatSnackBar,
    public penggunaService: PenggunaService,
    public masterItemService: MasterItemService,
    public permintaanPembelianService: PermintaanPembelianService,
    dialogRef: MatDialogRef<PermintaanPembelianDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
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


    if (data.data.detail) {
      let i = 0;
      for (const detail of data.data.detail) {
        this.initItemMasterSelect(i, detail.item.uuid);
        i++;
      }
    }


    this.documentProperties = new AppHttpGenerate(
      permintaanPembelianService.http,
      permintaanPembelianService.getDocumentProperties,
      this.documentPropertiesSuccess
    );
  }


  ngAfterViewInit(): void {
    // set element select of salesman
    this.salesmanLazy.select = this.selectSalesman;

    // set element select of item master
    if (this.data.data.detail) {
      // let i = 0;
      // for (const detail of this.data.data.detail) {
      //   this.itemLazy[i].select = this.selectItem.toArray()[i];
      //   i++;
      // }
    }


    // this.selectItem.

  }


  onTabChanged(index) {
    if (index === 1) { // tab data permintaan pembelian

      if (!this.isPermintaanPembelianLoaded) { // hanya jika belum terbuka sama sekali

        if (this.isInsert() || this.isUpdate()) {
          if (this.data.data.detail) {
            let i = 0;
            for (const detail of this.data.data.detail) {
              this.itemLazy[i]._loadMore();
              i++;
            }
          }

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


  initItemMasterSelect(i, uuid = '', fg = permintaanPembelianDetailForm()) {
    this.itemLazy.push(new SelectLazy(fg,
      'item',
      this.masterItemService.http,
      this.masterItemService.getData,
      uuid,
      this.isInsert())
    );
  }


  documentPropertiesSuccess = (value: any) => {
    this.form.controls['tanggalPermintaan'].setValue(value['date']);
    this.form.controls['nomorDokumenPr'].setValue(value['nomorDokumen']);
    this.form.controls['counterPr'].setValue(value['counter']);
    this.form.controls['nomorPrefixPr'].setValue(value['prefix']);
  };


  generateDocumentProperties() {
    this.form.controls['tanggalPermintaan'].setValue('');
    this.form.controls['nomorDokumenPr'].setValue('');
    this.form.controls['counterPr'].setValue('');
    this.form.controls['nomorPrefixPr'].setValue('');

    this.documentProperties.generate();
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
    if (this.selectedIndex === 2) {
      this.save(this.form.getRawValue());
    } else {
      this.selectedIndex++;
    }
  }

  previous() {
    this.selectedIndex--;
  }

  afterItemMasterViewInit(event, i?) {
    if (event instanceof MatSelect) {
      this.itemLazy[i].select = event;
    }
  }

  addNewDetailPermintaanItem(fa) {
    const detailFormGroup = permintaanPembelianDetailForm(permintaanPembelianDetailInit, {
      ...permintaanPembelianDetailDisables,
      item: true
    });
    const detailLength = (<FormArray>this.form.controls['detail']).length;
    this.initItemMasterSelect(detailLength, undefined, detailFormGroup); // init lazy buat item master
    this.reactiveFormUtil.addFormArray(detailFormGroup, fa);
    this.itemLazy[detailLength]._loadMore((data: MasterItem[]) => {
      if (data) {
        this.dataWarna.push([]); // init nilai data warna  tiap detail item yang akan dipilih
        this.warna.push([]); // init
        data.forEach(value => this.createListWarna(value, detailLength));
      }
    });
  }

  removeDetailPermintaanItem(fa, i) {
    this.dataWarna.splice(i, 1);
    this.warna.splice(i, 1);
    this.itemLazy.splice(i, 1); // hapus init lazy item
    this.reactiveFormUtil.removeFormArray(fa, i);
  }

  getDetailWarnaValues(fg: FormGroup, arrayControlName: string) {
    return (<FormArray>fg.controls[arrayControlName]).value;
  }

  displayFn(opt?): any | undefined {
    return opt ? opt : undefined;
  }


  editPropertiWarnaChips(fg: FormGroup, i, j) {
    const  initValuePropertiWarna = (<FormArray> fg.controls['detailWarna']).getRawValue()[j];
    this.openWarnaPropertiPanel(initValuePropertiWarna, this.reactiveFormUtil.getFormArray('detailWarna', fg), i, false, j);
  }

  openWarnaPropertiPanel(initValue: PermintaanPembelianDetailWarna, fa: FormArray, i, action = true, j?) {

    // const v = (initValue instanceof PermintaanPembelianDetailWarna) ? {} : {};
    // open dialog untuk isi jumlah , unit dan catatan
    const dialogRef = this.dialog.open(PropertiWarnaComponent, {
      width: '300px',
      data: {
        action: action,
        data: initValue,
        disables: {...permintaanPembelianDetailWarnaDisables, unit: true}
      },
      autoFocus: false,
      position: {bottom: '50px', top: '100px'}
    });

    // callback closing dari dialog
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (action) { // jika tambah data properti warna yang baru
          this.addNewWarna(fa, result.values);
          this.dataWarnaTrigger[i].closePanel();
        } else {  // jika di ubah
          const existingValue = fa.getRawValue();
          existingValue[j] = result.values;
          fa.patchValue(existingValue);
          openAppSnackbar(this.snackBar,
            'Data Warna "' + result.values.warna.namaWarna + '" berhasil diubah', SNACKBAR_SUCCESS_STYLE);
        }
      }
    });

  }


  selected(event: MatAutocompleteSelectedEvent, fa: FormArray, i?): void {

    if (event.option.value !== null) { // jika ada nilainya
      const alreadySelectedWarna = [...(<FormArray>this.form.controls['detail']).getRawValue()[i]['detailWarna']];
      if (alreadySelectedWarna
        .filter(value => value.warna.uuid === event.option.value.uuid)
        .length > 0) {
        openAppSnackbar(this.snackBar,
          'Warna "' + event.option.value.namaWarna + '" ada pada daftar yang terpilih!!!', SNACKBAR_WARNING_STYLE, 1500);
        return;
      }
      this.openWarnaPropertiPanel({...permintaanPembelianDetailWarnaInit, warna: {...event.option.value}}, fa, i);
    }
  }

  addNewWarna(fa: FormArray, init: PermintaanPembelianDetailWarna) {
    this.reactiveFormUtil.addFormArray(permintaanPembelianDetailWarnaForm(init), fa);
  }

  removeWarna(fa, i) {
    this.reactiveFormUtil.removeFormArray(fa, i);
  }

  onWarnaTriggerInitialized(trigger) {
    this.dataWarnaTrigger.push(trigger);
  }

  onItemSelectionChange(v, i, fgDetail) {
    this.itemLazy[i].data.filter(value => value.uuid === v.value).map(value => this.dataWarna[i] = [...value.warna]);
    const detailWarna = (<FormArray> fgDetail.controls['detailWarna']).getRawValue();
    if (detailWarna !== undefined && detailWarna.length > 0) {
      while (this.reactiveFormUtil.getFormArray('detailWarna', fgDetail).length !== 0) {
        this.reactiveFormUtil.removeFormArray(this.reactiveFormUtil.getFormArray('detailWarna', fgDetail), 0);
      }
    }
  }


  // '6c0ce28c-b09c-4b29-80cb-ed28e718a53e'
  createListWarna(item, i) {
    const warnaItem = new WarnaItem(item, item.warna);
    this.warna[i].push(warnaItem);
  }


  /**
   * Funsi yang digunakan untuk menyimpan data
   * @param value: data
   */
  save(value?): void {
    if (value.prApprovedBy.uuid.length === 0) {
      delete value.prApprovedBy;
    }

    if (value.prCancelledBy.uuid.length === 0) {
      delete value.prCancelledBy;
    }


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


class WarnaItem {
  constructor(
    public item: MasterItem,
    public warna: MasterWarna[]
  ) {
  }
}
