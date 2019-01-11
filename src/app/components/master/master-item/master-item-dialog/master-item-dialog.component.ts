import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {DialogUtil} from '../../../../shared/dialog-util';
import {
  MAT_DIALOG_DATA,
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatDialogRef,
  MatSnackBar
} from '@angular/material';
import {Ui} from '../../../../shared/ui';
import {first} from 'rxjs/operators';
import {SUCCESS, trimReactiveObject} from '../../../../shared/utils';
import {delayHttpRequest, invertColor, openAppSnackbar, SNACKBAR_WARNING_STYLE} from '../../../../shared/constants';
import {MasterItemService} from '../../../../services/master/master-item/master-item.service';
import {MasterCategoryService} from '../../../../services/master/master-category/master-category.service';
import {MasterUnitService} from '../../../../services/master/master-unit/master-unit.service';
import {
  masterItemBarcodeForm,
  masterItemErrorStateMatchers,
  masterItemForm,
  masterItemNamaAliasForm
} from '../../../../inits/master/master-item';
import {FormArray, FormGroup} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MasterWarnaService} from '../../../../services/master/master-warna/master-warna.service';
import {MasterWarna, masterWarnaForm} from '../../../../inits/master/master-warna';
import {SelectLazy} from '../../../../shared/select-lazy';
import {MasterUnit} from '../../../../inits/master/master-unit-init';
import {MasterCategory} from '../../../../inits/master/master-category-init';


@Component({
  selector: 'app-master-item-dialog',
  templateUrl: './master-item-dialog.component.html',
  styleUrls: ['./master-item-dialog.component.scss'],
  animations: [
    trigger('barcodeExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('aliasExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MasterItemDialogComponent extends DialogUtil
  implements OnInit, AfterViewInit {

  close = undefined;
  invertColor = invertColor;

  @ViewChild('selectUnit') selectUnit;
  unitLazy: SelectLazy<MasterUnit>;

  @ViewChild('selectKategori') selectKategori;
  kategoriLazy: SelectLazy<MasterCategory>;


  // @ViewChild('selectWarna') selectWarna;
  dataWarna: any[] = [];
  warnaPage = 0;
  waitingLoadMoreWarna = false;
  isLastWarna = false;
  warnaFailToFetch = false;

  barcodeState = 'collapsed';
  aliasState = 'collapsed';

  // @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('warnaTrigger', { read: MatAutocompleteTrigger }) warnaTrigger: MatAutocompleteTrigger;

  constructor(public snackBar: MatSnackBar,
              public masterWarnaService: MasterWarnaService,
              public masterItemService: MasterItemService,
              public masterKategoriService: MasterCategoryService,
              public masterUnitService: MasterUnitService,
              dialogRef: MatDialogRef<MasterItemDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {
    super(dialogRef,
      data,
      masterItemForm(data.data, data.disables),
      masterItemErrorStateMatchers);

    // init untuk data unit
    this.unitLazy = new SelectLazy(
      this.form,
      'unit',
      masterUnitService.http,
      masterUnitService.getData,
      data.data.unit.uuid,
      this.isInsert());

    // init untuk data kategori
    this.kategoriLazy = new SelectLazy(
      this.form,
      'kategori',
      masterKategoriService.http,
      masterKategoriService.getData,
      data.data.kategori.uuid,
      this.isInsert(),
      {
        subKategori: []
      }, 5);

  }

  ngAfterViewInit(): void {
    this.unitLazy.select = this.selectUnit;
    this.kategoriLazy.select = this.selectKategori;
  }

  ngOnInit() {
    this.forNamaKain();
    this.generateNamaKain();

    if (this.isInsert() || this.isUpdate()) {
      this.kategoriLazy._loadMore();
      this.kategoriLazy.listenToChilds();

      this.unitLazy._loadMore();
      this._loadMoreWarna();
    }
  }

  forNamaKain() {
    const controlNamaKain = this.form.controls['namaKain'];

    const namaItem = <string> this.form.controls['namaItem'].value;
    const ukuran = <string> this.form.controls['ukuran'].value;
    const benang = <string> this.form.controls['benang'].value;
    const jenisKain = <string> this.form.controls['jenisKain'].value;

    const namaKain = controlNamaKain.value;
    const tempNamaKain =
      namaItem.trim() +
      (ukuran.trim().length > 0 ? ' ' : '') + ukuran.trim() +
      (benang.trim().length > 0 ? ' ' : '') + benang.trim() +
      (jenisKain.trim().length > 0 ? ' ' : '') + jenisKain.trim();

    if (namaKain !== tempNamaKain) {
      controlNamaKain.setValue(tempNamaKain);
    }
  }

  generateNamaKain() {
    this.form.controls['namaItem'].valueChanges.subscribe(value => {
      this.forNamaKain();
    });

    this.form.controls['ukuran'].valueChanges.subscribe(value => {
      this.forNamaKain();
    });

    this.form.controls['benang'].valueChanges.subscribe(value => {
      this.forNamaKain();
    });

    this.form.controls['jenisKain'].valueChanges.subscribe(value => {
      this.forNamaKain();
    });
  }

  barcodeClick() {
    this.barcodeState = (this.barcodeState === 'collapsed') ? 'expanded' : 'collapsed';
  }

  aliasClick() {
    this.aliasState = (this.aliasState === 'collapsed') ? 'expanded' : 'collapsed';
  }

  addNewBarcode(fa) {
    this.reactiveFormUtil.addFormArray(masterItemBarcodeForm(), fa);
  }

  barcodeCount() {
    return (<FormArray> this.form.controls['barcode']).length;
  }

  removeBarcode(fa, i) {
    this.reactiveFormUtil.removeFormArray(fa, i);
    if (this.barcodeCount() === 0) {
      this.barcodeState = 'collapsed';
    }
  }

  addNewNamaAlias(fa) {
    this.reactiveFormUtil.addFormArray(masterItemNamaAliasForm(), fa);
  }

  aliasCount() {
    return (<FormArray> this.form.controls['namaAlias']).length;
  }

  removeNamaAlias(fa, i) {
    this.reactiveFormUtil.removeFormArray(fa, i);
    if (this.aliasCount() === 0) {
      this.aliasState = 'collapsed';
    }
  }

  simpanButtonCondition(formCondition) {
    if (this.unitLazy.waitingLoadMore || this.kategoriLazy.waitingLoadMore) {
      return true;
    }


    if (this.isInsert()) {
      return !(formCondition && !this.kategoriLazy.failToFetch && !this.unitLazy.failToFetch);
    } else {
      return !(this.kategoriLazy.isUuidTrue && this.unitLazy.isUuidTrue && formCondition);
    }
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

    if (this.warnaCount() === 0 ) {
      openAppSnackbar(this.snackBar, 'Pastikan anda memilih warna item ...', SNACKBAR_WARNING_STYLE);
      return;
    }

    this.dialogRef.disableClose = true;
    Ui.blockUI('#dialog-block', 0.5, 4, 0, 4);

    setTimeout(() => {
      this.masterItemService.postData(trimReactiveObject(value)).pipe(first()).subscribe(
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


  /**
   * Funsi untuk melakukan hapus data ke server
   * @param uuid id data
   */
  delete(uuid?): void {
    this.dialogRef.disableClose = true;
    Ui.blockUI('#dialog-block', 0.5, 4, 0, 4);

    setTimeout(() => {
      this.masterItemService.deleteData(uuid).pipe(first()).subscribe(
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

  displayFn(opt?): any | undefined {
    return opt ? opt : undefined;
  }

  selected(event: MatAutocompleteSelectedEvent, fa: FormArray): void {
    if (event.option.value !== null) {
      // (<FormArray> this.form.controls['warna'])
      console.log((<FormArray> this.form.controls['warna']).getRawValue())
      const alreadySelectedWarna = [...(<FormArray> this.form.controls['warna']).getRawValue()];
      if (alreadySelectedWarna
        .filter(value => value.uuid === event.option.value.uuid)
        .length > 0) {
        openAppSnackbar(this.snackBar,
          'Warna "' + event.option.value.namaWarna + '" ada pada daftar yang terpilih!!!', SNACKBAR_WARNING_STYLE, 1500);
        return;
      }

      this.addNewWarna(fa, event.option.value);
    }
  }

  addNewWarna(fa, init: MasterWarna) {
    this.reactiveFormUtil.addFormArray(masterWarnaForm(init), fa);
  }

  removeWarna(fa, i, temp) {
    this.reactiveFormUtil.removeFormArray(fa, i);
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    // return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }



  getWarnaValues(fg: FormGroup, arrayControlName: string) {
    return (<FormArray> fg.controls[arrayControlName]).value;
  }

  openAutoComplete() {
    this.warnaTrigger.openPanel();
  }

  refreshWarna() {
    this.warnaTrigger.openPanel();
    this.warnaFailToFetch = false;
    this.waitingLoadMoreWarna = false;
    this.loadMoreWarna();
  }

  loadMoreWarna() {
    if (!this.waitingLoadMoreWarna) {
      // ubah jadi status menunggu proses load warna selesai jadi true
      this.waitingLoadMoreWarna = true;
      setTimeout(() => {
        this._loadMoreWarna();
      }, 0);
    }
  }

  _loadMoreWarna() {
    setTimeout(() => {
      this.masterWarnaService.getData(this.warnaPage, 1).subscribe(
        (value: any) => {
          this.warnaPage++;
          if (value !== undefined && value.content !== undefined) {
            const d = value.content;
            if (d !== undefined) {
              this.dataWarna = [...this.dataWarna];
              this.isLastWarna = value.last;

              d.forEach(v => {
                this.dataWarna.push(v);
              });

            }
          }
          this.waitingLoadMoreWarna = false;
        },
        error => {
          this.warnaFailToFetch = true;
        }
      );
    }, 0)
  }

  warnaCount() {
    return (<FormArray> this.form.controls['warna']).length;
  }

}
