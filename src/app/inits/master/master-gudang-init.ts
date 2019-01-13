import {AppErrorStateMatcher} from '../../shared/utils';
import {AppAuditEntity, appAuditEntityDisables, appAuditEntityForm, appAuditEntityInit} from '../init';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MasterLokasi} from './master-lokasi-init';

export const tipeGudang = [
  {
    value: 1,
    display: 'Commercial'
  },
  {
    value: 2,
    display: 'Transit'
  },
  {
    value: 3,
    display: 'Reject'
  }
];

export interface MasterGudang extends AppAuditEntity {
  alamat?: string;
  autoReplenish?: boolean;
  kode?: string;
  lokasi?: MasterLokasi;
  nama?: string;
  tanggalMulai?: string;
  telepon?: string;
  tipeGudang?: any;
}

export const masterGudangInit = {
  ...appAuditEntityInit,
  alamat: '',
  autoReplenish: false,
  kode: '',
  lokasi: <MasterLokasi> {
    uuid: ''
  },
  nama: '',
  tanggalMulai: '',
  telepon: '',
  tipeGudang: ''
};

export const masterGudangDisables = {
  ...appAuditEntityDisables,
  alamat: false,
  autoReplenish: false,
  kode: false,
  lokasi: false,
  nama: false,
  tanggalMulai: false,
  telepon: false,
  tipeGudang: false
};

/** Init StateMatcher formcontrol Master Gudang */
export const masterGudangErrorStateMatchers = {
  alamat:  {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan alamat'
  },
  autoReplenish:  {
    matcher: new AppErrorStateMatcher(),
    message: 'Kolom ini tidak boleh kosong'
  },
  kode:  {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan kode'
  },
  lokasi:  {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda memilih lokasi gudang'
  },
  nama:  {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan nama'
  },
  tanggalMulai:  {
    matcher: new AppErrorStateMatcher(),
    message: 'Inputkan tanggal gudang mulai beroperasi'
  },
  telepon:  {
    matcher: new AppErrorStateMatcher(),
    message: 'Harap masukan nomor telepon'
  },
  tipeGudang: {
    matcher: new AppErrorStateMatcher(),
    message: 'Tipe gudang tidak boleh kosong'
  },
};


/** Fungsi Init Reactive Form Group untuk data Master Gudang*/
export function masterGudangForm(init: any = masterGudangInit,
                                 disables = masterGudangDisables,
                                 initAuditForm: Function = appAuditEntityForm): FormGroup {

  return new FormBuilder().group({
    ...initAuditForm(init, disables).controls,
    alamat: [{value: init.alamat, disabled: disables.alamat}, Validators.required],
    autoReplenish: [{value: init.autoReplenish, disabled: disables.autoReplenish}, Validators.required],
    kode: [{value: init.kode, disabled: disables.kode}, Validators.required],
    lokasi: new FormBuilder().group({
      uuid: [{value: init.lokasi.uuid, disabled: disables.lokasi}, Validators.required]
    }),
    nama: [{value: init.nama, disabled: disables.nama}, Validators.required],
    tanggalMulai: [{value: init.tanggalMulai, disabled: disables.tanggalMulai}, Validators.required],
    telepon: [{value: init.telepon, disabled: disables.telepon}, Validators.required],
    tipeGudang: [{value: init.tipeGudang, disabled: disables.tipeGudang}, Validators.required],
  });

}



