import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {DialogUtil} from '../../../../shared/dialog-util';
import {
  MAT_DIALOG_DATA,
  MatAutocomplete,
  MatAutocompleteSelectedEvent, MatAutocompleteTrigger,
  MatChipInputEvent,
  MatDialogRef,
  MatSnackBar
} from '@angular/material';
import {Ui} from '../../../../shared/ui';
import {first, map, startWith} from 'rxjs/operators';
import {SUCCESS} from '../../../../shared/utils';
import {delayHttpRequest, openAppSnackbar, SNACKBAR_WARNING_STYLE} from '../../../../shared/constants';
import {MasterItemService} from '../../../../services/master/master-item/master-item.service';
import {MasterCategoryService} from '../../../../services/master/master-category/master-category.service';
import {MasterUnitService} from '../../../../services/master/master-unit/master-unit.service';
import {
  masterItemBarcodeForm,
  masterItemErrorStateMatchers,
  masterItemForm,
  masterItemNamaAliasForm
} from '../../../../inits/master/master-item';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs';
import {MasterWarnaService} from '../../../../services/master/master-warna/master-warna.service';
import {MasterWarna, masterWarnaForm} from '../../../../inits/master/master-warna';


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
  implements OnInit {

  close = undefined;

  dataSubKategori: any[] = [];
  dataKategori: any[] = [];
  @ViewChild('selectKategori') selectKategori;
  kategoriPage = 0;
  waitingLoadMoreKategori = false;
  isLastKategori = false;
  isKategoriUuidTrue = false;
  kategoriFailToFetch = false;

  dataUnit: any[] = [];
  @ViewChild('selectUnit') selectUnit;
  unitPage = 0;
  waitingLoadMoreUnit = false;
  isLastUnit = false;
  isUnitUuidTrue = false;
  unitFailToFetch = false;

  dataWarna: any[] = [];
  @ViewChild('selectWarna') selectWarna;
  warnaPage = 0;
  waitingLoadMoreWarna = false;
  isLastWarna = false;
  warnaFailToFetch = false;

  barcodeState = 'collapsed';
  aliasState = 'collapsed';

  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('auto') matAutocomplete: MatAutocomplete;
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

    // subscribe to value change on control
    // this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
    //   startWith(null),
    //   map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
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




  ngOnInit() {
    this.forNamaKain();
    this.generateNamaKain();

    if (this.isInsert() || this.isUpdate()) {
      this._loadMoreKategori(); // load data master kategori
      this._loadMoreUnit(); // load data unit

      this._loadMoreWarna();
    }

    /* subscribe perubahan nilai dari kategori*/
    const controlKategori = (<FormGroup> this.form.controls['kategori']).controls['uuid'];
    controlKategori.valueChanges.subscribe(value => {
      if (value === undefined) { // jika nilai yang di dapat adalah undefined
        this.setSubKategoriToInvalid();
      }

      if (value !== undefined) {
        if (value !== null) { // jika bukan tombola load lebih banyak yang dipilih
          this.dataSubKategori = [];
          for (const kategori of this.dataKategori) {
            if (kategori.uuid === value) {
              this.dataSubKategori = [...kategori.subKategori];
              break;
            }
          }
          this.setSubKategoriToInvalid();
        }
      }
    });
    /**/
  }



  barcodeClick() {
    this.barcodeState = (this.barcodeState === 'collapsed') ? 'expanded' : 'collapsed';
  }

  aliasClick() {
    this.aliasState = (this.aliasState === 'collapsed') ? 'expanded' : 'collapsed';
  }

  isUnitEnabled() {
    return !(<FormGroup> this.form.controls['unit']).controls['uuid'].disabled;
  }

  refreshUnit() {
    this.unitFailToFetch = false;
    this.waitingLoadMoreUnit = false;
    this.loadMoreUnit();
  }

  loadMoreUnit() {
    this.selectUnit.open();
    if (!this.waitingLoadMoreUnit) {
      // ubah jadi status menunggu proses load lokasi selesai jadi true
      this.waitingLoadMoreUnit = true;
      setTimeout(() => {
        this._loadMoreUnit();
      }, 0);
    }
  }

  _loadMoreUnit() {
    setTimeout(() => {
      this.masterUnitService.getData(this.unitPage, 1).subscribe(
        (value: any) => {
          this.unitPage++;
          if (value !== undefined && value.content !== undefined) {
            const d = value.content;
            if (d !== undefined) {
              this.dataUnit = [...this.dataUnit];
              d.forEach(v => {
                this.dataUnit.push(v);

                // mengubah status pengambilan unit apakah sudah ditemukan atau belum
                if (!this.isUnitUuidTrue) {
                  this.isUnitUuidTrue = this.data.data['unit'].uuid === v.uuid;
                }

                if (this.isInsert()) {
                  (<FormGroup> this.form.controls['unit']).controls['uuid'].enable();
                } else if (this.isUpdate()) {
                  if (this.isUnitUuidTrue) {
                    (<FormGroup> this.form.controls['unit']).controls['uuid'].enable();
                  } else {
                    (<FormGroup> this.form.controls['unit']).controls['uuid'].disable();
                  }
                }

              });
              this.isLastUnit = value.last;

              // jika proses update, load trs datanya sampai dengan sama lokasi dari data yang akan diupdate
              if (!this.isLastUnit && this.isUpdate() && !this.isUnitUuidTrue) {
                this._loadMoreUnit();
              }
            }
          }
          this.waitingLoadMoreUnit = false;
        },
        error => {
          this.unitFailToFetch = true;
        }
      );
    }, 0)
  }

  isKategoriEnabled() {
    return !(<FormGroup> this.form.controls['kategori']).controls['uuid'].disabled;
  }

  refreshKategori() {
    this.kategoriFailToFetch = false;
    this.waitingLoadMoreKategori = false;
    this.loadMoreKategori();
  }

  loadMoreKategori() {

    this.selectKategori.open();
    if (!this.waitingLoadMoreKategori) {
      // ubah jadi status menunggu proses load lokasi selesai jadi true
      this.waitingLoadMoreKategori = true;
      setTimeout(() => {
        this._loadMoreKategori();
      }, 0);
    }
  }

  _loadMoreKategori() {
    setTimeout(() => {
      this.masterKategoriService.getData(this.kategoriPage, 1).subscribe(
        (value: any) => {
          this.kategoriPage++;
          if (value !== undefined && value.content !== undefined) {
            const d = value.content;
            if (d !== undefined) {
              this.dataKategori = [...this.dataKategori];
              d.forEach(v => {
                this.dataKategori.push(v);

                // mengubah status pengambilan kategori apakah sudah ditemukan atau belum
                if (!this.isKategoriUuidTrue) {
                  this.isKategoriUuidTrue = this.data.data['kategori'].uuid === v.uuid;
                }

                if (this.isInsert()) {
                  (<FormGroup> this.form.controls['kategori']).controls['uuid'].enable();
                  (<FormGroup> this.form.controls['subKategori']).controls['uuid'].enable();
                } else if (this.isUpdate()) {
                  if (this.isKategoriUuidTrue) {
                    (<FormGroup> this.form.controls['kategori']).controls['uuid'].enable();
                    (<FormGroup> this.form.controls['subKategori']).controls['uuid'].enable();
                  } else {
                    (<FormGroup> this.form.controls['kategori']).controls['uuid'].disable();
                    (<FormGroup> this.form.controls['subKategori']).controls['uuid'].disable();
                  }
                }

              });
              this.isLastKategori = value.last;

              // jika proses update, load trs datanya sampai dengan sama lokasi dari data yang akan diupdate
              if (!this.isLastKategori && this.isUpdate() && !this.isKategoriUuidTrue) {
                this._loadMoreKategori();
              }
            }
          }
          this.waitingLoadMoreKategori = false;
        },
        error => {
          this.kategoriFailToFetch = true;
        }
      );
    }, 0)
  }

  setSubKategoriToInvalid() {
    /** set incorrect ke sub kategori jika kategori di ganti **/
    const control = (<FormGroup> this.form.controls['subKategori']).controls['uuid'];
    if (control.touched) {;
      control.setValue(undefined);
    }
    /*=====*/
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
    if (this.isInsert()) {
      return !formCondition;
    } else {
      return !(this.isKategoriUuidTrue && this.isUnitUuidTrue && formCondition);
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
      this.masterItemService.postData(value).pipe(first()).subscribe(
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
      this.addNewWarna(fa, event.option.value);
    }
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    // return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }


  addNewWarna(fa, init: MasterWarna) {
    this.reactiveFormUtil.addFormArray(masterWarnaForm(init), fa);
  }

  removeWarna(fa, i) {
    this.reactiveFormUtil.removeFormArray(fa, i);
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
              d.forEach(v => {
                this.dataWarna.push(v);
              });
              this.isLastWarna = value.last;
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
