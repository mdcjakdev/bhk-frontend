import {Action} from './action.enum';
import {MatDialogRef} from '@angular/material';
import {FormGroup} from '@angular/forms';
import {Constants, statusDokumen} from './constants';


export class DialogUtil extends Constants {

  constructor(public dialogRef?: MatDialogRef<any>,
              public data?,
              public form?: FormGroup,
              public stateMatchers?: any) {
    super();
    // console.log(data)
    if (data !== undefined && data.data !== undefined) {
      form.patchValue(data.data);
    }


  }

  statusColor(status) {
    if (this.ifDraft(status)) {
      return {
        color: '#FFFFFF',
        background: '#1976D2'
      };
    } else if (this.ifApproved(status)) {
      return {
        color: '#FFFFFF',
        background: '#388E3C'
      };
    } else if (this.ifCancel(status)) {
      return {
        color: '#FFFFFF',
        background: '#E91E63'
      };
    } else {
      return {
        color: '#000000',
        background: '#AFB42B'
      };
    }
  }

  ifDraft(status) {
    return status === statusDokumen.DRAFT;
  }


  ifApproved(status) {
    return status === statusDokumen.APPROVED;
  }


  ifCancel(status) {
    return status === statusDokumen.CANCELED;
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
