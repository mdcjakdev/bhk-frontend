import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {DialogUtil} from '../../../../shared/dialog-util';
import {MasterWarnaService} from '../../../../services/master/master-warna/master-warna.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {masterWarnaBarcodeForm, masterWarnaErrorStateMatchers, masterWarnaForm} from '../../../../inits/master/master-warna';
import {Ui} from '../../../../shared/ui';
import {first} from 'rxjs/operators';
import {SUCCESS} from '../../../../shared/utils';
import {delayHttpRequest} from '../../../../shared/constants';
import {MasterItemService} from '../../../../services/master/master-item/master-item.service';
import {MasterCategoryService} from '../../../../services/master/master-category/master-category.service';
import {MasterSubCategory} from '../../../../inits/master/master-category-init';
import {MasterUnitService} from '../../../../services/master/master-unit/master-unit.service';
import {
  masterItemBarcodeForm,
  masterItemErrorStateMatchers,
  masterItemForm,
  masterItemNamaAliasForm
} from '../../../../inits/master/master-item';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-master-item-dialog',
  templateUrl: './master-item-dialog.component.html',
  styleUrls: ['./master-item-dialog.component.scss']
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


  dataUnit: any[] = [];
  @ViewChild('selectUnit') selectUnit;
  unitPage = 0;
  waitingLoadMoreUnit = false;
  isLastUnit = false;
  isUnitUuidTrue = false;

  constructor(public masterItemService: MasterItemService,
              public masterKategoriService: MasterCategoryService,
              public masterUnitService: MasterUnitService,
              dialogRef: MatDialogRef<MasterItemDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {
    super(dialogRef,
      data,
      masterItemForm(data.data, data.disables),
      masterItemErrorStateMatchers);
  }

  ngOnInit() {
    if (this.isInsert() || this.isUpdate()) {
      this._loadMoreKategori(); // load data master kategori
      this._loadMoreUnit(); // load data unit
    }
  }

  isUnitEnabled() {
    return !(<FormGroup> this.form.controls['unit']).controls['uuid'].disabled;
  }

  loadMoreUnit() {
    this.selectUnit.open();
    if (!this.waitingLoadMoreUnit) {
      // ubah jadi status menunggu proses load lokasi selesai jadi true
      this.waitingLoadMoreUnit = true;
      setTimeout(() => {
        this._loadMoreUnit();
      }, 2000);
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
        }
      );
    }, 2000)
  }

  isKategoriEnabled() {
    return !(<FormGroup> this.form.controls['kategori']).controls['uuid'].disabled;
  }

  loadMoreKategori() {
    this.selectKategori.open();
    if (!this.waitingLoadMoreKategori) {
      // ubah jadi status menunggu proses load lokasi selesai jadi true
      this.waitingLoadMoreKategori = true;
      setTimeout(() => {
        this._loadMoreKategori();
      }, 1000);
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
        }
      );
    }, 1000)
  }

  onKategoriChanged(event) {
    if (event !== undefined) {
      for (const kategori of this.dataKategori) {
        if (kategori.uuid === event.value) {
          this.dataSubKategori = [...kategori.subKategori];
          break;
        }
      }
    }
  }

  addNewBarcode(fa) {
    this.reactiveFormUtil.addFormArray(masterItemBarcodeForm(), fa);
  }

  removeBarcode(fa, i) {
    this.reactiveFormUtil.removeFormArray(fa, i);
  }

  addNewNamaAlias(fa) {
    this.reactiveFormUtil.addFormArray(masterItemNamaAliasForm(), fa);
  }

  removeNamaAlias(fa, i) {
    this.reactiveFormUtil.removeFormArray(fa, i);
  }


  /**
   * Funsi yang digunakan untuk menyimpan data
   * @param value: data
   */
  save(value?): void {
    console.log(value)
    this.dialogRef.disableClose = true;
    Ui.blockUI('#dialog-block', 0.5, 4, 0, 4);

    setTimeout(() => {
      this.masterItemService.postData(value).pipe(first()).subscribe(
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
