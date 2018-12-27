import {AppAuditEntity, appAuditEntityForm, appAuditEntityInit} from '../init';
import {AppErrorStateMatcher} from '../../shared/utils';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


export const tipeIdentitas = [
  'KTP',
  'SIM',
  'PASPOR',
  'BPJS'
];

export interface MasterKaryawan extends AppAuditEntity {
  nama?: string;
  tipeIdentitas?: string;
  nomorIdentitas?: string;
  alamat?: string;
  telepon?: string;
  status?: string;
}

export const masterKaryawanInit = {
  ...appAuditEntityInit,
  nama: '',
  tipeIdentitas: '',
  nomorIdentitas: '',
  alamat: '',
  telepon: '',
  status: '',
};

export const masterKaryawanDisables = {
  nama: false,
  tipeIdentitas: false,
  nomorIdentitas: false,
  alamat: false,
  telepon: false,
  status: false,
};

/** Init StateMatcher formcontrol Master Karyawan */
export const masterKaryawanErrorStateMatchers = {
  nama: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda menginputkan nama'},
  tipeIdentitas: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda memilih tipe identitas '},
  nomorIdentitas: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda menginputkan nomor identitas'},
  alamat: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda menginputkan alamat'},
  telepon: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda menginputkan telepon'}
};


/** Fungsi Init Reactive Form Group untuk data Master Karyawan */
export function masterKaryawanForm(init: MasterKaryawan = masterKaryawanInit,
                               disables = masterKaryawanDisables,
                               initAuditForm: Function = appAuditEntityForm): FormGroup {

  return new FormBuilder().group({
    ...initAuditForm().controls,
    nama: [{value: init.nama, disabled: false}, Validators.required],
    tipeIdentitas: [{value: init.tipeIdentitas, disabled: false}, Validators.required],
    nomorIdentitas: [{value: init.nomorIdentitas, disabled: false}, Validators.required],
    alamat: [{value: init.alamat, disabled: false}, Validators.required],
    telepon: [{value: init.telepon, disabled: false}, Validators.required],
    status: {value: init.status, disabled: false}
  });

}

