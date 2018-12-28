import {AppAuditEntity, appAuditEntityForm, appAuditEntityInit} from '../init';
import {MasterLokasi} from '../master/master-lokasi-init';
import {AppErrorStateMatcher} from '../../shared/utils';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MasterKaryawan} from '../master/master-karyawan-init';

export interface Pengguna extends AppAuditEntity {
  username?: string;
  password?: any;
  karyawan?: MasterKaryawan;
}

export const penggunaInit = {
  ...appAuditEntityInit,
  username: '',
  password: '',
  karyawan: <MasterKaryawan>{
    uuid: ''
  }
};

export const penggunaDisables = {
  username: false,
  password: false,
  karyawan: false
};

/** Init StateMatcher formcontrol Pengguna */
export const penggunaErrorStateMatchers = {
  username: {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan username'
  },
  password: {
    matcher: new AppErrorStateMatcher(),
    message: 'Kata sandi minimal 8 karakter'
  },
  passwordConfirmation: {
    matcher: new AppErrorStateMatcher(),
    message: 'Kata sandi tidak sama'
  },
  karyawan: {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda memilih nama kayawan'
  }
};


/** Fungsi Init Reactive Form Group untuk data Pengguna */
export function penggunaForm(init: Pengguna = penggunaInit,
                                 disables = penggunaDisables,
                                 initAuditForm: Function = appAuditEntityForm): FormGroup {

  return new FormBuilder().group({
    ...initAuditForm().controls,
    username: [{value: init.username, disabled: disables.username}, Validators.required],
    password: [{value: init.password, disabled: disables.password}, [Validators.required, Validators.minLength(8)]],
    karyawan: new FormBuilder().group({
      uuid: [{value: init.karyawan.uuid, disabled: disables.karyawan}, Validators.required]
    })
  });

}



