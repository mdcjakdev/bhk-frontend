import {AppAuditEntity, appAuditEntityDisables, appAuditEntityForm, appAuditEntityInit} from '../../init';
import {MasterUnit, masterUnitDisables, masterUnitForm, masterUnitInit} from '../../master/master-unit-init';
import {MasterWarna, masterWarnaForm, masterWarnaInit} from '../../master/master-warna';
import {MasterItem, masterItemDisables, masterItemForm, masterItemInit} from '../../master/master-item';
import {Pengguna, penggunaDisables, penggunaForm, penggunaInit} from '../../administrator/pengguna-init';
import {AppErrorStateMatcher, statusGeneralization} from '../../../shared/utils';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {statusDokumen} from '../../../shared/constants';


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
  onPo?: boolean;
}

/** Init nilai awal Permintaan Pembelian Detail Warna  */
export const permintaanPembelianDetailWarnaInit = {
  ...appAuditEntityInit,
  warna: masterWarnaInit,
  jumlah: '',
  unit: masterUnitInit,
  catatan: '-'
};

/** Init nilai awal  */
export const permintaanPembelianDetailInit = {
  ...appAuditEntityInit,
  item: masterItemInit,
  catatan: '',
  detailWarna: []
};

/** Init nilai awal Permintaan Pembelian */
export const permintaanPembelianInit = {
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
  statusDokumenPr: statusDokumen.DRAFT,
  tanggalPermintaan: '',
  onPo: false
};

/** Init nilai awal status disable formcontrol Permintaan Pembelian Detail Warna */
export const permintaanPembelianDetailWarnaDisables = {
  ...appAuditEntityDisables,
  warna: false,
  jumlah: false,
  unit: false,
  catatan: false
};

/** Init nilai awal status disable formcontrol Permintaan Pembelian Detail */
export const permintaanPembelianDetailDisables = {
  ...appAuditEntityDisables,
  item: masterItemDisables,
  catatan: false
};

/** Init nilai awal status disable formcontrol Permintaan Pembelian */
export const permintaanPembelianDisables = {
  ...appAuditEntityDisables,
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
  item: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda memilih item'},
  detailWarna: {...permintaanPembelianDetailWarnaErrorStateMatchers}
};

/** Init StateMatcher formcontrol Permintaan Pembelian */
export const permintaanPembelianErrorStateMatchers = {
  counterPr: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda counter ada'},
  detail: {...permintaanPembelianDetailErrorStateMatchers},
  salesman: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda memilih salesman'},
  nomorDokumenPr: {matcher: new AppErrorStateMatcher(), message: 'Nomor dokumen tidak boleh kosong'},
  nomorPrefixPr: {matcher: new AppErrorStateMatcher(), message: 'Nomor prefix tidak boleh kosong'},
  tanggalPermintaan: {matcher: new AppErrorStateMatcher(), message: 'Tanggal permintaan tidak boleh kosong'}
};


/** Fungsi Init Reactive Form Group untuk data Permintaan Pembelian Detail Warna*/
export function permintaanPembelianDetailWarnaForm(init = permintaanPembelianDetailWarnaInit,
                                                   disables = permintaanPembelianDetailWarnaDisables,
                                                   forGeneralization = false,
                                                   initAuditForm: Function = appAuditEntityForm): FormGroup {
  return new FormBuilder().group({
    ...initAuditForm(init, disables).controls,
    warna: masterWarnaForm(init.warna),
    jumlah: [{value: init.jumlah, disabled: disables.jumlah}, statusGeneralization(Validators.required, forGeneralization)],
    // unit: new FormBuilder().group({
    //   uuid: [{value: init.unit.uuid, disabled: disables.unit}, Validators.required]
    // }),
    unit: masterUnitForm(init.unit, {...masterUnitDisables, uuid: true}, true),
    catatan: {value: init.catatan, disabled: disables.catatan}
  });
}

function generatePermintaanPembelianDetailWarna(temp: any[], forGeneralization = false) {
  const data = [];
  const disables = (forGeneralization) ? {...permintaanPembelianDetailWarnaDisables, uuid: true} : permintaanPembelianDetailWarnaDisables;
  temp.forEach(value => data.push(permintaanPembelianDetailWarnaForm(value, disables, forGeneralization)));
  return data;
}


/** Fungsi Init Reactive Form Group untuk data Permintaan Pembelian Detail*/
export function permintaanPembelianDetailForm(init = permintaanPembelianDetailInit,
                                              disables = permintaanPembelianDetailDisables,
                                              forGeneralization = false,
                                              initAuditForm: Function = appAuditEntityForm): FormGroup {

  const detailWarna = (init.detailWarna.length === 0) ? [] : generatePermintaanPembelianDetailWarna(init.detailWarna, forGeneralization);

  return new FormBuilder().group({
    ...initAuditForm(init, disables).controls,
    // item: new FormBuilder().group({
    //   uuid: [{value: init.item.uuid, disabled: disables.item}, Validators.required]
    // }),
    item: masterItemForm(init.item, {...masterItemDisables, uuid: true}),
    catatan: {value: init.catatan, disabled: disables.catatan},
    detailWarna: new FormBuilder().array(detailWarna)
  });
}

function generatePermintaanPembelianDetail(temp: any[], forGeneralization = false) {
  const data = [];
  const disables = (forGeneralization) ? {...permintaanPembelianDetailDisables, uuid: true} : permintaanPembelianDetailDisables;
  temp.forEach(value => data.push(permintaanPembelianDetailForm(value, disables, forGeneralization)));
  return data;
}

/** Fungsi Init Reactive Form Group untuk data Permintaan Pembelian */
export function permintaanPembelianForm(init = permintaanPembelianInit,
                                        disables = permintaanPembelianDisables,
                                        forGeneralization = false,
                                        initAuditForm: Function = appAuditEntityForm): FormGroup {

  /** megeneralisasi nilai2 array dari detail item */
  const detail = (init.detail.length === 0) ? [] : generatePermintaanPembelianDetail(init.detail, forGeneralization);

  return new FormBuilder().group({
    ...initAuditForm(init, disables).controls,
    catatan: {value: init.catatan, disabled: disables.catatan},
    counterPr: [{value: init.counterPr, disabled: disables.counterPr}, statusGeneralization(Validators.required, forGeneralization)],
    detail: new FormBuilder().array(detail),
    salesman: penggunaForm(init.salesman, {...penggunaDisables, uuid: true}, true),
    nomorDokumenPr: [{
      value: init.nomorDokumenPr,
      disabled: disables.nomorDokumenPr
    }, statusGeneralization(Validators.required, forGeneralization)],
    prApprovedBy: new FormBuilder().group({
      uuid: {
        value: ((init.prApprovedBy === undefined || init.prApprovedBy === null) ? '' : init.prApprovedBy.uuid),
        disabled: disables.prApprovedBy
      }
    }),
    prApprovedDate: {value: init.prApprovedDate, disabled: disables.prApprovedDate},
    prCanceledDate: {value: init.prCanceledDate, disabled: disables.prCanceledDate},
    prCanceledReason: {value: init.prCanceledReason, disabled: disables.prCanceledReason},
    prCancelledBy: new FormBuilder().group({
      uuid: {
        value: ((init.prCancelledBy === undefined || init.prCancelledBy === null) ? '' : init.prCancelledBy.uuid),
        disabled: disables.prCancelledBy
      },
    }),
    nomorPrefixPr: [{
      value: init.nomorPrefixPr,
      disabled: disables.nomorPrefixPr
    }, statusGeneralization(Validators.required, forGeneralization)],
    statusDokumenPr: {value: init.statusDokumenPr, disabled: disables.statusDokumenPr},
    tanggalPermintaan: [{
      value: init.tanggalPermintaan,
      disabled: disables.tanggalPermintaan
    }, statusGeneralization(Validators.required, forGeneralization)],
    onPo: {value: init.onPo, disabled: false}
  });

}




