import {Action} from './action.enum';
import {MatDialogRef} from '@angular/material';
import {FormGroup} from '@angular/forms';
import {ReactiveFormUtil} from './reactive-form-util';


export class DialogUtil {

  public reactiveFormUtil = new ReactiveFormUtil();

  constructor(public dialogRef: MatDialogRef<any>,
              public data,
              public form: FormGroup,
              public stateMatchers: any) {
    if (data !== undefined && data.data !== undefined) {
      form.patchValue(data.data);
    }

  }

  /**
   * Jika data yang passing pada open dialog bukanlah null
   */
  isDataNull() {
    return this.data === undefined || this.data === null;
  }


  /**
   * Mengetahui apakah aksi yang dilakukan adalah insert data
   */
  isInsert() {
    return (this.data.action !== undefined && this.data.action === Action.INSERT);
  }

  /**
   * Mengetahui apakah aksi yang dilakukan adalah update data
   */
  isUpdate() {
    return (this.data.action !== undefined && this.data.action === Action.UPDATE);
  }

  /**
   * Mengetahui apakah aksi yang dilakukan adalah deletedata
   */
  isDelete() {
    return (this.data.action !== undefined && this.data.action === Action.DELETE);
  }

  /**
   * Mengetahui apakah aksi yang dilakukan adalah melihat detail data
   */
  isDetail() {
    return (this.data.action !== undefined && this.data.action === Action.READ_ONE);
  }

}
