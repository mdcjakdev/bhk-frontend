import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormArray, FormGroup} from '@angular/forms';
import {penawaranWarnaDetailForm, penawaranWarnaInfoForm} from '../../../../inits/co/co-init';
import {ReactiveFormUtil} from '../../../../shared/reactive-form-util';
import {Constants} from '../../../../shared/constants';
import {masterSubCategoryForm} from '../../../../inits/master/master-category-init';

@Component({
  selector: 'app-penawaran-warna-dialog-info',
  templateUrl: './penawaran-warna-dialog-info.component.html',
  styleUrls: ['./penawaran-warna-dialog-info.component.scss']
})
export class PenawaranWarnaDialogInfoComponent implements OnInit {

  // item: any;
  public reactiveFormUtil = new ReactiveFormUtil();
  formFieldAppearance = new Constants().formFieldAppearance;

  formCoDetail: FormGroup; // = penawaranWarnaDetailForm();

  constructor(private changeDetector: ChangeDetectorRef,
              public dialogRef: MatDialogRef<PenawaranWarnaDialogInfoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    // console.log(data)

    this.formCoDetail = (this.data.formDetail !== undefined) ? this.data.formDetail : penawaranWarnaDetailForm(this.data.detail);
    // console.log(this.formCoDetail.getRawValue())
  }


  getNamaKainOrAlias() {
    const l = (this.data.item.namaAlias) ? this.data.item.namaAlias.length : 0;
    if (l === 0) {
      return this.data.item.namaKain;
    } else {
      return this.data.item.namaAlias[l - 1];
    }
  }

  ngOnInit() {

  }

  addNewInfo(fa: FormArray) {
    this.reactiveFormUtil.addFormArray(penawaranWarnaInfoForm(), fa, true);
  }



  removeInfo(fa, i) {
    this.reactiveFormUtil.removeFormArray(fa, i);
  }



  onNoClick(): void {
    const result = {...this.formCoDetail.getRawValue()};
    this.formCoDetail = penawaranWarnaDetailForm();
    this.dialogRef.close(result);
  }

}
