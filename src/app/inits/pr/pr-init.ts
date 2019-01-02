import {AppAuditEntity, appAuditEntityForm, appAuditEntityInit} from '../init';
import {MasterUnit, masterUnitInit} from '../master/master-unit-init';
import {MasterWarna, masterWarnaInit} from '../master/master-warna';
import {MasterItem, masterItemInit} from '../master/master-item';
import {Pengguna, penggunaInit} from '../administrator/pengguna-init';
import {AppErrorStateMatcher} from '../../shared/utils';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

export const statusDokumen = {
  DRAFT: 'DRAFT',
  APPROVED: 'APPROVED',
  CHECKED: 'CHECKED',
  CANCELED: 'CANCELED'
};

/** Model Class PR Detail Warna */
export interface PermintaanPembelianDetailWarna extends AppAuditEntity {
  warna?: MasterWarna;
  jumlah?: any;
  unit?: MasterUnit;
  catatan?: string;
}

/** Model Class PR Detail */
export interface PermintaanPembelianDetail extends AppAuditEntity {
  item?: MasterItem;
  catatan?: string;
  detailWarna?: PermintaanPembelianDetailWarna[];
}

/** Model Class PR */
export interface PermintaanPembelian extends AppAuditEntity {
  catatan?: string;
  counterPr?: any;
  detail?: PermintaanPembelianDetail[];
  salesman?: Pengguna;
  nomorDokumenPr?: string;
  prApprovedBy?: Pengguna;
  prApprovedDate?: any;
  prCanceledDate?: any;
  prCanceledReason?: string;
  prCancelledBy?: Pengguna;
  nomorPrefixPr?: string;
  statusDokumenPr?: string;
  tanggalPermintaan?: any;
}

/** Init nilai awal Permintaan Pembelian Detail Warna  */
export const permintaanPembelianDetailWarnaInit = <PermintaanPembelianDetailWarna>{
  ...appAuditEntityInit,
  warna: masterWarnaInit,
  jumlah: '',
  unit: masterUnitInit,
  catatan: ''
};

/** Init nilai awal Master Item Nama Alias */
export const permintaanPembelianDetailInit = <PermintaanPembelianDetail>{
  ...appAuditEntityInit,
  item: masterItemInit,
  catatan: '',
  detailWarna: []
};

/** Init nilai awal Permintaan Pembelian */
export const permintaanPembelianInit = <PermintaanPembelian>{
  ...appAuditEntityInit,
  catatan: '',
  counterPr: '',
  detail: [],
  salesman: penggunaInit,
  nomorDokumenPr: '',
  prApprovedBy: penggunaInit,
  prApprovedDate: '',
  prCanceledDate: '',
  prCanceledReason: '',
  prCancelledBy: penggunaInit,
  nomorPrefixPr: '',
  statusDokumenPr: '',
  tanggalPermintaan: ''
};

/** Init nilai awal status disable formcontrol Permintaan Pembelian Detail Warna */
export const permintaanPembelianDetailWarnaDisables = {
  warna: false,
  jumlah: false,
  unit: false,
  catatan: false
};

/** Init nilai awal status disable formcontrol Permintaan Pembelian Detail */
export const permintaanPembelianDetailDisables = {
  item: false,
  catatan: false
};

/** Init nilai awal status disable formcontrol Permintaan Pembelian */
export const permintaanPembelianDisables = {
  catatan: false,
  counterPr: false,
  salesman: true,
  nomorDokumenPr: true,
  prApprovedBy: false,
  prApprovedDate: false,
  prCanceledDate: false,
  prCanceledReason: false,
  prCancelledBy: false,
  nomorPrefixPr: false,
  statusDokumenPr: false,
  tanggalPermintaan: true,
};

/** Init StateMatcher formcontrol permintaanPembelianDetailWarna */
export const permintaanPembelianDetailWarnaErrorStateMatchers = {
  warna: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda memilih warna'},
  jumlah: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda menginputkan jumlah data'},
  unit: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda memilih unit'}
};

/** Init StateMatcher formcontrol permintaanPembelianDetail */
export const permintaanPembelianDetailErrorStateMatchers = {
  item: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda memilih item'}
};

/** Init StateMatcher formcontrol Permintaan Pembelian */
export const permintaanPembelianErrorStateMatchers = {
  counterPr: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda counter ada'},
  detail: [],
  salesman: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda memilih salesman'},
  nomorDokumenPr: {matcher: new AppErrorStateMatcher(), message: 'Nomor dokumen tidak boleh kosong'},
  nomorPrefixPr: {matcher: new AppErrorStateMatcher(), message: 'Nomor prefix tidak boleh kosong'},
  tanggalPermintaan: {matcher: new AppErrorStateMatcher(), message: 'Tanggal permintaan tidak boleh kosong'}
};


/** Fungsi Init Reactive Form Group untuk data Permintaan Pembelian Detail Warna*/
export function permintaanPembelianDetailWarnaForm(init: PermintaanPembelianDetailWarna = permintaanPembelianDetailWarnaInit,
                                                   disables = permintaanPembelianDetailWarnaDisables,
                                                   initAuditForm: Function = appAuditEntityForm): FormGroup {
  return new FormBuilder().group({
    ...initAuditForm().controls,
    warna: new FormBuilder().group({
      uuid: [{value: init.warna.uuid, disabled: disables.warna}, Validators.required]
    }),
    jumlah: [{value: init.jumlah, disabled: disables.jumlah}, Validators.required],
    unit: new FormBuilder().group({
      uuid: [{value: init.unit.uuid, disabled: disables.unit}, Validators.required]
    }),
    catatan: {value: init.catatan, disabled: disables.catatan}
  });
}

function generatePermintaanPembelianDetailWarna(temp: PermintaanPembelianDetailWarna[]) {
  const data = [];
  temp.forEach(value => data.push(permintaanPembelianDetailWarnaForm(value)));
  return data;
}


/** Fungsi Init Reactive Form Group untuk data Permintaan Pembelian Detail*/
export function permintaanPembelianDetailForm(init: PermintaanPembelianDetail = permintaanPembelianDetailInit,
                                        disables = permintaanPembelianDetailDisables,
                                        initAuditForm: Function = appAuditEntityForm): FormGroup {

  const detailWarna = (init.detailWarna.length === 0) ? [] : generatePermintaanPembelianDetailWarna(init.detailWarna);

  return new FormBuilder().group({
    ...initAuditForm().controls,
    item: new FormBuilder().group({
      uuid: [{value: init.item.uuid, disabled: disables.item}, Validators.required]
    }),
    catatan: {value: init.catatan, disabled: disables.catatan},
    detailWarna: new FormBuilder().array(detailWarna)
  });
}

function generatePermintaanPembelianDetail(temp: PermintaanPembelianDetail[]) {
  const data = [];
  temp.forEach(value => data.push(permintaanPembelianDetailForm(value)));
  return data;
}

/** Fungsi Init Reactive Form Group untuk data Permintaan Pembelian */
export function permintaanPembelianForm(init: PermintaanPembelian = permintaanPembelianInit,
                               disables = permintaanPembelianDisables,
                               initAuditForm: Function = appAuditEntityForm): FormGroup {

  /** megeneralisasi nilai2 array dari detail item */
  const detail = (init.detail.length === 0) ? [] : generatePermintaanPembelianDetail(init.detail);

  return new FormBuilder().group({
    ...initAuditForm().controls,
    catatan: {value: init.catatan, disabled: disables.catatan},
    counterPr: [{value: init.counterPr, disabled: disables.counterPr}, Validators.required],
    detail: new FormBuilder().array(detail),
    salesman: new FormBuilder().group({
      uuid: [{value: init.salesman.uuid, disabled: disables.salesman}, Validators.required]
    }),
    nomorDokumenPr: [{value: init.nomorDokumenPr, disabled: disables.nomorDokumenPr}, Validators.required],
    prApprovedBy: new FormBuilder().group({
      uuid: {value: init.prApprovedBy.uuid, disabled: disables.prApprovedBy}
    }),
    prApprovedDate: {value: init.prApprovedDate, disabled: disables.prApprovedDate},
    prCanceledDate: {value: init.prCanceledDate, disabled: disables.prCanceledDate},
    prCanceledReason: {value: init.prCanceledReason, disabled: disables.prCanceledReason},
    prCancelledBy: new FormBuilder().group({
      uuid: {value: init.prCancelledBy.uuid, disabled: disables.prCancelledBy},
    }),
    nomorPrefixPr: [{value: init.nomorPrefixPr, disabled: disables.nomorPrefixPr}, Validators.required],
    statusDokumenPr: {value: init.statusDokumenPr, disabled: disables.statusDokumenPr},
    tanggalPermintaan: [{value: init.tanggalPermintaan, disabled: disables.tanggalPermintaan}, Validators.required]
  });

}


