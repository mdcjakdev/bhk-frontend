import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormArray, FormGroup} from '@angular/forms';
import {penawaranWarnaDetailForm, penawaranWarnaInfoErrorStateMatchers, penawaranWarnaInfoForm} from '../../../../inits/co/co-init';
import {ReactiveFormUtil} from '../../../../shared/reactive-form-util';
import {Constants} from '../../../../shared/constants';
import {FocusMonitor} from '@angular/cdk/a11y';

@Component({
  selector: 'app-penawaran-warna-dialog-info',
  templateUrl: './penawaran-warna-dialog-info.component.html',
  styleUrls: ['./penawaran-warna-dialog-info.component.scss']
})
export class PenawaranWarnaDialogInfoComponent implements OnInit, AfterViewInit {

  public reactiveFormUtil = new ReactiveFormUtil();
  formFieldAppearance = new Constants().formFieldAppearance;

  formCoDetail: FormGroup; // = penawaranWarnaDetailForm();

  stateMatcherInfo = penawaranWarnaInfoErrorStateMatchers;

  constructor(public dialogRef: MatDialogRef<PenawaranWarnaDialogInfoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formCoDetail = (this.data.formDetail !== undefined)
      ? this.data.formDetail : penawaranWarnaDetailForm(this.data.detail);

  }


  ngAfterViewInit(): void {
  }


  uuidEmpty(uuid: string) {
    return uuid.trim().length === 0;
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
