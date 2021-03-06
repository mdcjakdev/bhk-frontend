import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppErrorStateMatcher, statusGeneralization} from '../../shared/utils';
import {AppAuditEntity, appAuditEntityDisables, appAuditEntityForm, appAuditEntityInit} from '../init';


export interface MasterUnit extends AppAuditEntity {
  name?: string;
  deskripsi?: string;
}

export const masterUnitInit = {
  ...appAuditEntityInit,
  name: '',
  deskripsi: ''
};

export const masterUnitDisables = {
  ...appAuditEntityDisables,
  name: false,
  deskripsi: false
};

/** Init StateMatcher formcontrol Master Unit */
export const masterUnitErrorStateMatchers = {
  name: {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan alamat'
  }
};



/** Fungsi Init Reactive Form Group untuk data Master Unit*/
export function masterUnitForm(init: any = masterUnitInit,
                                 disables = masterUnitDisables,
                                 forGeneralization = false,
                                 initAuditForm: Function = appAuditEntityForm): FormGroup {

  return new FormBuilder().group({
    ...initAuditForm(init, disables).controls,
    name: [{value: init.name, disabled: false}, statusGeneralization(Validators.required, forGeneralization)],
    deskripsi: {value: init.deskripsi, disabled: false},
  });

}
