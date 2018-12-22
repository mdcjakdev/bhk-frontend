import {AppErrorStateMatcher} from '../../shared/utils';
import {AppAuditEntity, appAuditEntityForm, appAuditEntityInit} from '../init';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MasterLokasi} from './master-lokasi-init';

export interface MasterGudang extends AppAuditEntity {
  alamat?: string;
  autoReplenish?: any;
  kode?: string;
  lokasi?: MasterLokasi;
  nama?: string;
  tanggalMulai?: string;
  telepon?: string;
}

export const masterGudangInit = {
  ...appAuditEntityInit,
  alamat: '',
  autoReplenish: '',
  kode: '',
  lokasi: <MasterLokasi> {
    uuid: ''
  },
  nama: '',
  tanggalMulai: '',
  telepon: '',
};

export const masterGudangDisables = {
  alamat: false,
  autoReplenish: false,
  kode: false,
  lokasi: false,
  nama: false,
  tanggalMulai: false,
  telepon: false,
};

/** Init StateMatcher formcontrol Master Gudang */
export const masterGudangErrorStateMatchers = {
  alamat:  {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan alamat'
  },
  autoReplenish:  {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan alamat'
  },
  kode:  {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan alamat'
  },
  lokasi:  {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan alamat'
  },
  nama:  {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan alamat'
  },
  tanggalMulai:  {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan alamat'
  },
  telepon:  {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan alamat'
  },
};


/** Fungsi Init Reactive Form Group untuk data Master Gudang*/
export function masterGudangForm(init: MasterGudang = masterGudangInit,
                                 disables = masterGudangDisables,
                                 initAuditForm: Function = appAuditEntityForm): FormGroup {

  return new FormBuilder().group({
    ...initAuditForm().controls,
    alamat: [{value: init.alamat, disabled: disables.alamat}, Validators.required],
    autoReplenish: [{value: init.autoReplenish, disabled: disables.autoReplenish}, Validators.required],
    kode: [{value: init.kode, disabled: disables.kode}, Validators.required],
    lokasi: new FormBuilder().group({
      uuid: [{value: init.lokasi.uuid, disabled: disables.lokasi}, Validators.required]
    }),
    nama: [{value: init.nama, disabled: disables.nama}, Validators.required],
    tanggalMulai: [{value: init.tanggalMulai, disabled: disables.tanggalMulai}, Validators.required],
    telepon: [{value: init.telepon, disabled: disables.telepon}, Validators.required],
  });

}



