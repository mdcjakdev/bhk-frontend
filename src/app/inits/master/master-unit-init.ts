import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppErrorStateMatcher} from '../../shared/utils';


export interface MasterUnit {
  uuid: string;
  name: string;
  deskripsi: string;
}

export const masterUnitInit = {
  uuid: '',
  name: '',
  deskripsi: ''
};

export function masterUnitForm(value = masterUnitInit): FormGroup {
  return new FormBuilder().group({
    uuid: {value: value.uuid, disabled: false},
    name: [{value: value.name, disabled: false}, Validators.required],
    deskripsi: {value: value.deskripsi, disabled: false},
  });
}

export const masterUnitErrorStateMatchers = {
  name: {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan unit'
  }
};
