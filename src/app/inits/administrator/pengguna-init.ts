import {AppAuditEntity, appAuditEntityDisables, appAuditEntityForm, appAuditEntityInit} from '../init';
import {MasterLokasi} from '../master/master-lokasi-init';
import {AppErrorStateMatcher} from '../../shared/utils';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MasterKaryawan, masterKaryawanDisables, masterKaryawanForm} from '../master/master-karyawan-init';

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
  ...appAuditEntityDisables,
  username: false,
  password: false,
  karyawan: true
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
                                 forGeneralization = false,
                                 initAuditForm: Function = appAuditEntityForm): FormGroup {

  return new FormBuilder().group({
    ...initAuditForm(init, disables).controls,
    username: [{value: init.username, disabled: disables.username}, (forGeneralization) ? Validators.nullValidator : Validators.required],
    password: [{value: init.password, disabled: disables.password}, (forGeneralization) ? Validators.nullValidator : [Validators.required, Validators.minLength(8)]],
    karyawan: masterKaryawanForm(init.karyawan, {...masterKaryawanDisables, uuid: true})
  });

}



