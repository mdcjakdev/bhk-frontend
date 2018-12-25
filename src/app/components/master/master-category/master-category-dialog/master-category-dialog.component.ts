import {Component, Inject, OnInit} from '@angular/core';
import {DialogUtil} from '../../../../shared/dialog-util';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {MasterCategoryService} from '../../../../services/master/master-category/master-category.service';
import {masterCategoryErrorStateMatchers, masterCategoryForm, masterSubCategoryForm} from '../../../../inits/master/master-category-init';
import {Ui} from '../../../../shared/ui';
import {first} from 'rxjs/operators';
import {SUCCESS} from '../../../../shared/utils';
import {delayHttpRequest, openAppSnackbar} from '../../../../shared/constants';

@Component({
  selector: 'app-master-category-dialog',
  templateUrl: './master-category-dialog.component.html',
  styleUrls: ['./master-category-dialog.component.scss']
})
export class MasterCategoryDialogComponent extends DialogUtil
  implements OnInit {

  close = undefined;

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


  /**
   * Funsi yang digunakan untuk menyimpan data
   * @param value: data
   */
  save(value?): void {
    // console.log(value)
    this.dialogRef.disableClose = true;
    Ui.blockUI('#dialog-block', 0.5, 4, 0, 4);

    setTimeout(() => {
      this.masterCategoryService.postData(value).pipe(first()).subscribe(
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
