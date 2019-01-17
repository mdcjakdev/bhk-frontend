import {AppAuditEntity, appAuditEntityDisables, appAuditEntityForm, appAuditEntityInit} from '../init';
import {AppErrorStateMatcher, statusGeneralization} from '../../shared/utils';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

export const tipeStatusKaryawan = [
  'Permanent',
  'Contract',
  'Part Time'
];

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
  ...appAuditEntityDisables,
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
export function masterKaryawanForm(init: any = masterKaryawanInit,
                                   disables = masterKaryawanDisables,
                                   forGeneralization = false,
                                   initAuditForm: Function = appAuditEntityForm): FormGroup {

  return new FormBuilder().group({
    ...initAuditForm(init, disables).controls,
    nama: [{value: init.nama, disabled: disables.nama}, statusGeneralization(Validators.required, forGeneralization)],
    tipeIdentitas: [{value: init.tipeIdentitas, disabled: disables.tipeIdentitas}, statusGeneralization(Validators.required, forGeneralization)],
    nomorIdentitas: [{value: init.nomorIdentitas, disabled: disables.nomorIdentitas}, statusGeneralization(Validators.required, forGeneralization)],
    alamat: [{value: init.alamat, disabled: disables.alamat}, statusGeneralization(Validators.required, forGeneralization)],
    telepon: [{value: init.telepon, disabled: disables.telepon}, statusGeneralization(Validators.required, forGeneralization)],
    status: {value: init.status, disabled: disables.status}
  });

}

