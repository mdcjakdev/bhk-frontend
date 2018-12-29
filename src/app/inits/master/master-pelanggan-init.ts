import {AppErrorStateMatcher} from '../../shared/utils';
import {AppAuditEntity, appAuditEntityForm, appAuditEntityInit} from '../init';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


export const tipePelanggan = [
  'CV',
  'PT',
  'PERSONAL'
];

export interface MasterPelanggan extends AppAuditEntity {
  alamat?: string;
  fax?: string;
  hp?: string;
  nama?: string;
  npwp?: string;
  telepon?: string;
  tipePelanggan?: string;
}

export const masterPelangganInit = {
  ...appAuditEntityInit,
  alamat: '',
  fax: '',
  hp: '',
  nama: '',
  npwp: '',
  telepon: '',
  tipePelanggan: ''
};

export const masterPelangganDisables = {
  alamat: false,
  fax: false,
  hp: false,
  nama: false,
  npwp: false,
  telepon: false,
  tipePelanggan: false
};

/** Init StateMatcher formcontrol MasterPelanggan */
export const masterPelangganErrorStateMatchers = {
  alamat: {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan alamat'
  },
  hp: {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan nomor hp'
  },
  nama: {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan nama'
  },
  npwp: {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan npwp'
  },
  tipePelanggan: {
    matcher: new AppErrorStateMatcher(),
    message: 'Tipe pelanggan tidak boleh kosong'
  }
};


/** Fungsi Init Reactive Form Group untuk data MasterPelanggan */
export function masterPelangganForm(init: MasterPelanggan = masterPelangganInit,
                                   disables = masterPelangganDisables,
                                   initAuditForm: Function = appAuditEntityForm): FormGroup {

  return new FormBuilder().group({
    ...initAuditForm().controls,
    alamat: [{value: init.alamat, disabled: disables.alamat}, Validators.required],
    fax: {value: init.fax, disabled: disables.fax},
    hp: [{value: init.hp, disabled: disables.hp}, Validators.required],
    nama: [{value: init.nama, disabled: disables.nama}, Validators.required],
    npwp: [{value: init.npwp, disabled: disables.npwp}, Validators.required],
    telepon: {value: init.telepon, disabled: disables.telepon},
    tipePelanggan: [{value: init.tipePelanggan, disabled: disables.tipePelanggan}, Validators.required]
  });

}



