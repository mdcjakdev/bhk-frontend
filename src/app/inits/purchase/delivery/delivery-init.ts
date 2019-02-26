import {
  PemesananPembelian,
  PemesananPembelianDetail,
  pemesananPembelianDetailDisables,
  pemesananPembelianDetailErrorStateMatchers,
  PemesananPembelianDetailWarna,
  pemesananPembelianDetailWarnaDisables,
  pemesananPembelianDetailWarnaErrorStateMatchers,
  pemesananPembelianDetailWarnaInit,
  pemesananPembelianDisables,
  pemesananPembelianErrorStateMatchers
} from '../po/po-init';
import {AppAuditEntity, appAuditEntityDisables, appAuditEntityForm, appAuditEntityInit} from '../../init';
import {AppErrorStateMatcher, generateArrayForm, qualifyObject, statusGeneralization} from '../../../shared/utils';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UUID_COLUMN} from '../../../shared/constants';
import {MasterLokasi, masterLokasiDisables, masterLokasiForm, masterLokasiInit} from "../../master/master-lokasi-init";
import {masterWarnaDisables} from "../../master/master-warna";

export const status = {
  open: 'OPEN',
  partially: 'PARTIALLY_DELIVERED',
  closed: 'CLOSED',
  completed: 'COMPLETED'
};


export interface PengirimanDetailWarna extends AppAuditEntity {
  pemesananPembelianDetailWarna?: PemesananPembelianDetailWarna;
  balanceQty?: any;
  deliverQty?: any;
  expedisi?: string;
  status?: string;
  catatan?: string;
}


export interface PengirimanDetail extends AppAuditEntity {
  pemesananPembelianDetail?: PemesananPembelianDetail;
  warna?: PengirimanDetailWarna[];
}

export interface Pengiriman extends AppAuditEntity {

  pemesananPembelian?: PemesananPembelian;

  tanggalPengiriman?: any;
  nomorDokumen?: string;
  nomorPrefix?: string;
  counter?: any;
  catatan?: string;
  status?: string;

  lokasi?: MasterLokasi;
  detail?: PengirimanDetail[];

}

// =============================INITIALIZING =======================================


export const pengirimanDetailWarnaInit = {
  ...appAuditEntityInit,
  pemesananPembelianDetailWarna: pemesananPembelianDetailWarnaInit,
  balanceQty: '',
  deliverQty: '',
  expedisi: '',
  status: '',
  catatan: ''
};

export const pengirimanDetailInit = {
  ...appAuditEntityInit,
  pemesananPembelianDetail: {uuid: ''},
  warna: []
};


export const pengirimanInit = {
  ...appAuditEntityInit,

  pemesananPembelian: {uuid: ''},
  tanggalPengiriman: '',
  nomorDokumen: '',
  nomorPrefix: '',
  counter: '',
  catatan: '',
  status: '',
  lokasi: masterLokasiInit,
  detail: []
};

// ================ DISABLES STATUS ===================================================================


export const pengirimanDetailWarnaDisables = {
  ...appAuditEntityDisables,
  pemesananPembelianDetailWarna: pemesananPembelianDetailWarnaDisables,
  balanceQty: true,
  deliverQty: false,
  expedisi: false,
  status: false,
  catatan: false
};

export const pengirimanDetailDisables = {
  ...appAuditEntityDisables,
  pemesananPembelianDetail: pemesananPembelianDetailDisables
};


export const pengirimanDisables = {
  ...appAuditEntityDisables,
  pemesananPembelian: pemesananPembelianDisables,

  tanggalPengiriman: true,
  nomorDokumen: true,
  nomorPrefix: false,
  counter: false,
  catatan: false,
  status: false,
  lokasi: masterWarnaDisables
};


// ==========================STATE MATCHERS==============================================


export const pengirimanDetailWarnaErrorStateMatchers = {
  pemesananPembelianDetailWarna: pemesananPembelianDetailWarnaErrorStateMatchers,
  deliverQty: {matcher: new AppErrorStateMatcher(), message: 'Tidak boleh kosong'},
};

export const pengirimanDetailErrorStateMatchers = {
  pemesananPembelianDetail: pemesananPembelianDetailErrorStateMatchers
};


export const pengirimanErrorStateMatchers = {
  pemesananPembelian: pemesananPembelianErrorStateMatchers,

  tanggalPenawaran: {matcher: new AppErrorStateMatcher(), message: 'Tanggal Penawaran tidak boleh kosong'},
  nomorDokumen: {matcher: new AppErrorStateMatcher(), message: 'Nomor Dokumen harus ada'},
  nomorPrefix: {matcher: new AppErrorStateMatcher(), message: 'Nomor prefix harus ada'},
  counter: {matcher: new AppErrorStateMatcher(), message: 'Counter harus ada'},
  lokasi: {matcher: new AppErrorStateMatcher(), message: 'Silahkan pilih lokasi tujuan'}
  // status: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda counter ada'}
};


// ====================== FORM ===============================================================


export function pengirimanDetailWarnaForm(init = pengirimanDetailWarnaInit,
                                          disables = pengirimanDetailWarnaDisables,
                                          forGeneralization = false,
                                          initAuditForm: Function = appAuditEntityForm): FormGroup {

  return new FormBuilder().group({
    ...initAuditForm(init, disables).controls,
    pemesananPembelianDetailWarna: new FormBuilder().group({
      uuid: {
        value: (init.pemesananPembelianDetailWarna) ? qualifyObject(init.pemesananPembelianDetailWarna, UUID_COLUMN) : '',
        disabled: false
      }
    }),
    balanceQty: {
      value: qualifyObject(init, 'balanceQty'),
      disabled: disables.balanceQty
    },
    deliverQty: [{
      value: qualifyObject(init, 'deliverQty'),
      disabled: disables.deliverQty
    }, statusGeneralization(Validators.required, forGeneralization)],
    expedisi: {
      value: qualifyObject(init, 'expedisi'),
      disabled: disables.expedisi
    },
    status: {
      value: qualifyObject(init, 'status'),
      disabled: disables.status
    },
    catatan: {
      value: qualifyObject(init, 'catatan'),
      disabled: disables.catatan
    }
  });
}


export function pengirimanDetailForm(init = pengirimanDetailInit,
                                     disables = pengirimanDetailDisables,
                                     forGeneralization = false,
                                     initAuditForm: Function = appAuditEntityForm): FormGroup {

  const warna = (init.warna.length === 0) ? [] : generateArrayForm(init.warna, pengirimanDetailWarnaForm);

  return new FormBuilder().group({
    ...initAuditForm(init, disables).controls,
    pemesananPembelianDetail: new FormBuilder().group({
      uuid: {
        value: (init.pemesananPembelianDetail) ? qualifyObject(init.pemesananPembelianDetail, UUID_COLUMN) : '',
        disabled: false
      }
    }),
    warna: new FormBuilder().array(warna)
  });
}


export function pengirimanForm(init = pengirimanInit,
                               disables = pengirimanDisables,
                               forGeneralization = false,
                               initAuditForm: Function = appAuditEntityForm): FormGroup {

  /** megeneralisasi nilai2 array dari detail item */
  const detail = (init.detail.length === 0) ? [] : generateArrayForm(init.detail, pengirimanDetailForm);

  return new FormBuilder().group({
    ...initAuditForm(init, disables).controls,
    pemesananPembelian: new FormBuilder().group({
      uuid: {
        value: (init.pemesananPembelian) ? qualifyObject(init.pemesananPembelian, UUID_COLUMN) : '',
        disabled: false
      }
    }),
    tanggalPengiriman: [{
      value: qualifyObject(init, 'tanggalPengiriman'),
      disabled: disables.tanggalPengiriman
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
    catatan: {
      value: qualifyObject(init, 'catatan'),
      disabled: disables.catatan
    },
    status: {
      value: qualifyObject(init, 'status'),
      disabled: disables.status
    },
    lokasi: masterLokasiForm(init.lokasi, {...masterLokasiDisables, uuid: false}, true),
    detail: new FormBuilder().array(detail)
  });
}







