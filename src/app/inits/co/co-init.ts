import {
  PemesananPembelian,
  PemesananPembelianDetail,
  pemesananPembelianDetailDisables,
  pemesananPembelianDetailErrorStateMatchers, pemesananPembelianDetailForm,
  pemesananPembelianDetailInit,
  PemesananPembelianDetailWarna,
  pemesananPembelianDetailWarnaDisables,
  pemesananPembelianDetailWarnaErrorStateMatchers,
  pemesananPembelianDetailWarnaInit,
  pemesananPembelianDisables,
  pemesananPembelianErrorStateMatchers,
  pemesananPembelianInit
} from '../po/po-init';
import {MasterSupplier} from '../master/master-supplier';
import {AppAuditEntity, appAuditEntityDisables, appAuditEntityForm, appAuditEntityInit} from '../init';
import {AppErrorStateMatcher, generateArrayForm, qualifyObject, statusGeneralization} from '../../shared/utils';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UUID_COLUMN} from '../../shared/constants';

export const statusPenawaran = {
  accepted: 'ACC',
  notAccepted: 'NOT_ACC'
};

export interface PenawaranWarnaInfo extends AppAuditEntity {
  sjNumber?: any;
  tanggalPengiriman?: any;
  tanggalPenerimaan?: any;
  status?: any;
  catatan?: any;
}

export interface PenawaranWarnaDetailWarna extends AppAuditEntity {
  pemesananPembelianDetailWarna?: PemesananPembelianDetailWarna;
  info?: PenawaranWarnaInfo[];
}


export interface PenawaranWarnaDetail extends AppAuditEntity {
  pemesananPembelianDetail?: PemesananPembelianDetail;
  warna?: PenawaranWarnaDetailWarna[];
}

export interface PenawaranWarna {

  pemesananPembelian?: PemesananPembelian;

  tanggalPenawaran?: any;
  nomorDokumen?: string;
  nomorPrefix?: string;
  counter?: any;
  status?: string;
  detail?: PenawaranWarnaDetail[];

}

// =============================INITIALIZING =======================================

export const penawaranWarnaInfoInit = {
  ...appAuditEntityInit,
  sjNumber: '',
  tanggalPengiriman: '',
  tanggalPenerimaan: '',
  status: statusPenawaran.notAccepted,
  catatan: '',
};


export const penawaranWarnaDetailWarnaInit = {
  ...appAuditEntityInit,
  pemesananPembelianDetailWarna: pemesananPembelianDetailWarnaInit,
  info: []
};

export const penawaranWarnaDetailInit = {
  ...appAuditEntityInit,
  pemesananPembelianDetail: { uuid: '' },
  warna: []
};


export const penawaranWarnaInit = {
  ...appAuditEntityInit,
  pemesananPembelian: { uuid: '' },

  tanggalPenawaran: '',
  nomorDokumen: '',
  nomorPrefix: '',
  counter: '',
  status: '',
  detail: []
};


export interface PenawaranWarna {

  pemesananPembelian?: PemesananPembelian;

  tanggalPenawaran?: any;
  nomorDokumen?: string;
  nomorPrefix?: string;
  counter?: any;
  status?: string;
  detail?: PenawaranWarnaDetail[];

}

// ================ DISABLES STATUS ===================================================================

export const penawaranWarnaInfoDisables = {
  ...appAuditEntityDisables,
  sjNumber: false,
  tanggalPengiriman: false,
  tanggalPenerimaan: false,
  status: false,
  catatan: false,
};


export const penawaranWarnaDetailWarnaDisables = {
  ...appAuditEntityDisables,
  pemesananPembelianDetailWarna: pemesananPembelianDetailWarnaDisables
};

export const penawaranWarnaDetailDisables = {
  ...appAuditEntityDisables,
  pemesananPembelianDetail: pemesananPembelianDetailDisables
};


export const penawaranWarnaDisables = {
  ...appAuditEntityDisables,
  pemesananPembelian: pemesananPembelianDisables,

  tanggalPenawaran: true,
  nomorDokumen: true,
  nomorPrefix: false,
  counter: false,
  status: false
};


// ==========================STATE MATCHERS==============================================

export const penawaranWarnaInfoErrorStateMatchers = {
  sjNumber: {matcher: new AppErrorStateMatcher(), message: 'Tidak boleh kosong'},
  // tanggalPengiriman: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda counter ada'},
  // tanggalPenerimaan: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda counter ada'}
};


export const penawaranWarnaDetailWarnaErrorStateMatchers = {
  pemesananPembelianDetailWarna: pemesananPembelianDetailWarnaErrorStateMatchers
};

export const penawaranWarnaDetailErrorStateMatchers = {
  pemesananPembelianDetail: pemesananPembelianDetailErrorStateMatchers
};


export const penawaranWarnaErrorStateMatchers = {
  pemesananPembelian: pemesananPembelianErrorStateMatchers,

  tanggalPenawaran: {matcher: new AppErrorStateMatcher(), message: 'Tanggal Penawaran tidak boleh kosong'},
  nomorDokumen: {matcher: new AppErrorStateMatcher(), message: 'Nomor Dokumen harus ada'},
  nomorPrefix: {matcher: new AppErrorStateMatcher(), message: 'Nomor prefix harus ada'},
  counter: {matcher: new AppErrorStateMatcher(), message: 'Counter harus ada'},
  // status: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda counter ada'}
};


// ====================== FORM ===============================================================

export function penawaranWarnaInfoForm(init = penawaranWarnaInfoInit,
                                       disables = penawaranWarnaInfoDisables,
                                       forGeneralization = false,
                                       initAuditForm: Function = appAuditEntityForm): FormGroup {

  return new FormBuilder().group({
    ...initAuditForm(init, disables).controls,
    sjNumber: [{
      value: qualifyObject(init, 'sjNumber'),
      disabled: disables.status
    }, statusGeneralization(Validators.required, forGeneralization)],
    tanggalPengiriman: {value: qualifyObject(init, 'tanggalPengiriman'), disabled: disables.tanggalPengiriman},
    tanggalPenerimaan: {value: qualifyObject(init, 'tanggalPenerimaan'), disabled: disables.tanggalPenerimaan},
    status: [{
      value: qualifyObject(init, 'status'),
      disabled: disables.status
    }, statusGeneralization(Validators.required, forGeneralization)],
    catatan: {value: qualifyObject(init, 'catatan'), disabled: disables.catatan}
  });
}


export function penawaranWarnaDetailWarnaForm(init = penawaranWarnaDetailWarnaInit,
                                              disables = penawaranWarnaDetailWarnaDisables,
                                              forGeneralization = false,
                                              initAuditForm: Function = appAuditEntityForm): FormGroup {

  const info = (init.info.length === 0) ? [] : generateArrayForm(init.info, penawaranWarnaInfoForm);

  return new FormBuilder().group({
    ...initAuditForm(init, disables).controls,
    pemesananPembelianDetailWarna: new FormBuilder().group({
      uuid: {
        value: (init.pemesananPembelianDetailWarna) ? qualifyObject(init.pemesananPembelianDetailWarna, UUID_COLUMN) : '',
        disabled: false
      }
    }),
    info: new FormBuilder().array(info)
  });
}


export function penawaranWarnaDetailForm(init = penawaranWarnaDetailInit,
                                         disables = penawaranWarnaDetailDisables,
                                         forGeneralization = false,
                                         initAuditForm: Function = appAuditEntityForm): FormGroup {

  const warna = (init.warna.length === 0) ? [] : generateArrayForm(init.warna, penawaranWarnaDetailWarnaForm);

  return new FormBuilder().group({
    ...initAuditForm(init, disables).controls,
    pemesananPembelianDetail: new FormBuilder().group({
      uuid: {value: (init.pemesananPembelianDetail) ? qualifyObject(init.pemesananPembelianDetail, UUID_COLUMN) : '', disabled: false}
    }),
    warna: new FormBuilder().array(warna)
  });
}


export function penawaranWarnaForm(init = penawaranWarnaInit,
                                   disables = penawaranWarnaDisables,
                                   forGeneralization = false,
                                   initAuditForm: Function = appAuditEntityForm): FormGroup {

  /** megeneralisasi nilai2 array dari detail item */
  const detail = (init.detail.length === 0) ? [] : generateArrayForm(init.detail, penawaranWarnaDetailForm);

  return new FormBuilder().group({
    ...initAuditForm(init, disables).controls,
    pemesananPembelian: new FormBuilder().group({
      uuid: {value: (init.pemesananPembelian) ? qualifyObject(init.pemesananPembelian, UUID_COLUMN) : '', disabled: false}
    }),
    tanggalPenawaran: [{
      value: qualifyObject(init, 'tanggalPenawaran'),
      disabled: disables.tanggalPenawaran
    }, statusGeneralization(Validators.required, forGeneralization)],
    nomorDokumen: [{
      value: qualifyObject(init, 'nomorDokumen'),
      disabled: disables.nomorDokumen
    }, statusGeneralization(Validators.required, forGeneralization)],
    nomorPrefix: [{
      value: qualifyObject(init, 'nomorPrefix'),
      disabled: disables.nomorPrefix
    }, statusGeneralization(Validators.required, forGeneralization)],
    counter: [{
      value: qualifyObject(init, 'counter'),
      disabled: disables.counter
    }, statusGeneralization(Validators.required, forGeneralization)],
    status: {
      value: qualifyObject(init, 'status'),
      disabled: disables.status
    },
    detail: new FormBuilder().array(detail)
  });
}








