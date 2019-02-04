import {FormArray, FormControl, FormGroup} from '@angular/forms';


export class ReactiveFormUtil {

  formControl = (formGroup: FormGroup, controlName: string) => <FormControl> formGroup.get(controlName);

  getFormGroup(fg: FormGroup, control: string) {
    return <FormGroup> fg.get(control);
  }

  /** Pengambilan form array untuk proses tambah atau hapus data */
  getFormArray(formArrayName: string, parentFormGroup: FormGroup): FormArray {
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
  addFormArray(initFormValue: FormGroup, formArray: FormArray | FormGroup, first = false) {
    if (first) {
      this.insertFormArrayFirst(initFormValue, <FormArray> formArray);
    } else {
      (<FormArray> formArray).push(initFormValue);
    }
  }


  private insertFormArrayFirst(initFormValue: FormGroup, formArray: FormArray) {
    formArray.insert(0, initFormValue);
  }


  removeFormArray(fa: FormArray, i) {
      fa.removeAt(i);
  }

}

