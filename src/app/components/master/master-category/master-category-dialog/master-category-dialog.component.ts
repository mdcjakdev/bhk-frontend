import {Component, Inject, OnInit} from '@angular/core';
import {DialogUtil} from '../../../../shared/dialog-util';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {MasterCategoryService} from '../../../../services/master/master-category/master-category.service';
import {
  masterCategoryErrorStateMatchers,
  masterCategoryForm,
  masterSubCategoryForm,
  tipeKategori
} from '../../../../inits/master/master-category-init';
import {Ui} from '../../../../shared/ui';
import {first} from 'rxjs/operators';
import {SUCCESS, trimReactiveObject} from '../../../../shared/utils';
import {delayHttpRequest, openAppSnackbar, SNACKBAR_WARNING_STYLE} from '../../../../shared/constants';
import {FormArray} from '@angular/forms';

@Component({
  selector: 'app-master-category-dialog',
  templateUrl: './master-category-dialog.component.html',
  styleUrls: ['./master-category-dialog.component.scss']
})
export class MasterCategoryDialogComponent extends DialogUtil
  implements OnInit {

  close = undefined;
  tipeKategori = tipeKategori;

  constructor(public snackBar: MatSnackBar,
              public masterCategoryService: MasterCategoryService,
              dialogRef: MatDialogRef<MasterCategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {
    super(dialogRef,
      data,
      masterCategoryForm(data.data),
      masterCategoryErrorStateMatchers);
  }

  addNewSubCategory(fa) {
    this.reactiveFormUtil.addFormArray(masterSubCategoryForm(), fa);
  }

  removeSubCategory(fa, i) {
    this.reactiveFormUtil.removeFormArray(fa, i);
  }

  subKategoriCount() {
    return (<FormArray> this.form.controls['subKategori']).length;
  }

  /**
   * Funsi yang digunakan untuk menyimpan data
   * @param value: data
   */
  save(value?): void {
    // jika tidak ada barcode yang di daftarkan
    if (this.subKategoriCount() === 0 ) {
      openAppSnackbar(this.snackBar, 'Sub Kategori belum ada ...', SNACKBAR_WARNING_STYLE);
      return;
    }

    this.dialogRef.disableClose = true;
    Ui.blockUI('#dialog-block', 0.5, 4, 0, 4);

    setTimeout(() => {
      this.masterCategoryService.postData(trimReactiveObject(value)).pipe(first()).subscribe(
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
      this.masterCategoryService.deleteData(uuid).pipe(first()).subscribe(
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

  ngOnInit() {
  }

}
