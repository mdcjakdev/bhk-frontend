import {FormArray, FormControl, FormGroup} from '@angular/forms';


export class ReactiveFormUtil {

  formControl = (formGroup: FormGroup, controlName: string) => <FormControl> formGroup.get(controlName);

  /** Pengambilan form array untuk proses tambah atau hapus data */
  getFormArray(formArrayName: string, parentFormGroup: FormGroup) {
    return (<FormArray> parentFormGroup.controls[formArrayName]);
  }

  /**
   * pengambilan form array untuk looping
   */
  getFormArrays(param: string, fg: FormGroup) {
    return (<FormArray>  fg.get(param)).controls;
  }

  /**
   * Untuk penambahan data pada form array
   */
  addFormArray(initFormValue: FormGroup, formArray) {
    formArray.push(initFormValue);
  }


  removeFormArray(fa: FormArray, i) {
    // if (y) {
      fa.removeAt(i);
    // }
  }

}

