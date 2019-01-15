import {AppAuditEntity, appAuditEntityDisables, appAuditEntityForm, appAuditEntityInit} from '../init';
import {MasterUnit, masterUnitDisables, masterUnitForm, masterUnitInit} from '../master/master-unit-init';
import {MasterWarna, masterWarnaDisables, masterWarnaForm, masterWarnaInit} from '../master/master-warna';
import {
  MasterItem,
  masterItemDisables,
  masterItemForm,
  masterItemInit,
  MasterItemNamaAlias, masterItemNamaAliasDisables, masterItemNamaAliasErrorStateMatchers, masterItemNamaAliasForm,
  masterItemNamaAliasInit
} from '../master/master-item';
import {Pengguna, penggunaDisables, penggunaForm, penggunaInit} from '../administrator/pengguna-init';
import {AppErrorStateMatcher, qualifyObject} from '../../shared/utils';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {statusDokumen, UUID_COLUMN} from '../../shared/constants';
import {masterKaryawanForm} from '../master/master-karyawan-init';
import {
  MasterSupplier,
  masterSupplierDisables,
  masterSupplierErrorStateMatchers,
  masterSupplierForm,
  masterSupplierInit
} from '../master/master-supplier';
import {
  MasterPelanggan, masterPelangganDisables,
  masterPelangganErrorStateMatchers,
  masterPelangganForm,
  masterPelangganInit
} from '../master/master-pelanggan-init';
import {PermintaanPembelian, permintaanPembelianDisables, permintaanPembelianForm, permintaanPembelianInit} from '../pr/pr-init';



/** Model Class PO Detail Warna */
export interface PemesananPembelianDetailWarna extends AppAuditEntity {
  warna?: MasterWarna;
  jumlah?: any;
  unit?: MasterUnit;
  catatan?: string;
  nomorMatching?: string;
  forRetail?: boolean;
}

/** Model Class PO Detail */
export interface PemesananPembelianDetail extends AppAuditEntity {
  item?: MasterItem;
  catatan?: string;
  namaAlias?: MasterItemNamaAlias;
  detailWarna?: PemesananPembelianDetailWarna[];
}

/** Model Class PO */
export interface PemesananPembelian extends AppAuditEntity {
  permintaanPembelian?: PermintaanPembelian;

  catatan?: string;
  counterPo?: any;
  detail?: PemesananPembelianDetail[];
  salesman?: Pengguna;
  nomorDokumenPo?: string;
  poApprovedBy?: Pengguna;
  poApprovedDate?: any;
  poCanceledDate?: any;
  poCanceledReason?: string;
  poCancelledBy?: Pengguna;
  nomorPrefixPo?: string;
  statusDokumenPo?: string;
  
  tanggalPemesanan?: any;
  supplier?: MasterSupplier;
  pelanggan?: MasterPelanggan;
  namaPic?: string;
  urgent?: boolean;
  
}

/** Init nilai awal Pemesanan Pembelian Detail Warna  */
export const pemesananPembelianDetailWarnaInit = {
  ...appAuditEntityInit,
  warna: masterWarnaInit,
  jumlah: '',
  unit: masterUnitInit,
  catatan: '-',
  nomorMatching: '',
  forRetail: false
};

/** Init nilai awal  */
export const pemesananPembelianDetailInit = {
  ...appAuditEntityInit,
  item: masterItemInit,
  catatan: '',
  detailWarna: [],
  namaAlias: masterItemNamaAliasInit
};

/** Init nilai awal Pemesanan Pembelian */
export const pemesananPembelianInit = {
  ...appAuditEntityInit,
  permintaanPembelian: permintaanPembelianInit,
  catatan: '',
  counterPo: '',
  detail: [],
  salesman: penggunaInit,
  nomorDokumenPo: '',
  poApprovedBy: penggunaInit,
  poApprovedDate: '',
  poCanceledDate: '',
  poCanceledReason: '',
  poCancelledBy: penggunaInit,
  nomorPrefixPo: '',
  statusDokumenPo: statusDokumen.DRAFT,
  tanggalPemesanan: '',
  supplier: masterSupplierInit,
  pelanggan: masterPelangganInit,
  namaPic: '',
  urgent: false
};

/** Init nilai awal status disable formcontrol Pemesanan Pembelian Detail Warna */
export const pemesananPembelianDetailWarnaDisables = {
  ...appAuditEntityDisables,
  warna: false,
  jumlah: false,
  unit: false,
  catatan: false,
  nomorMatching: false,
  forRetail: false
};

/** Init nilai awal status disable formcontrol Pemesanan Pembelian Detail */
export const pemesananPembelianDetailDisables = {
  ...appAuditEntityDisables,
  item: masterItemDisables,
  catatan: false,
  namaAlias: masterItemNamaAliasDisables
};

/** Init nilai awal status disable formcontrol Pemesanan Pembelian */
export const pemesananPembelianDisables = {
  ...appAuditEntityDisables,
  catatan: false,
  counterPo: false,
  salesman: true,
  nomorDokumenPo: true,
  poApprovedBy: false,
  poApprovedDate: false,
  poCanceledDate: false,
  poCanceledReason: false,
  poCancelledBy: false,
  nomorPrefixPo: false,
  statusDokumenPo: false,
  tanggalPemesanan: true,
  supplier: true,
  pelanggan: true,
  namaPic: false,
  urgent: false
};

/** Init StateMatcher formcontrol pemesanan PembelianDetailWarna */
export const pemesananPembelianDetailWarnaErrorStateMatchers = {
  warna: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda memilih warna'},
  jumlah: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda menginputkan jumlah data'},
  unit: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda memilih unit'},
  nomorMatching: {matcher: new AppErrorStateMatcher(), message: 'Nomor matching harus diisi' }
};

/** Init StateMatcher formcontrol permintaanPembelianDetail */
export const pemesananPembelianDetailErrorStateMatchers = {
  item: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda memilih item'},
  detailWarna: {...pemesananPembelianDetailWarnaErrorStateMatchers},
  namaAlias: masterItemNamaAliasErrorStateMatchers
};

/** Init StateMatcher formcontrol Pemesanan Pembelian */
export const pemesananPembelianErrorStateMatchers = {
  counterPo: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda counter ada'},
  detail: {...pemesananPembelianDetailErrorStateMatchers },
  salesman: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda memilih salesman'},
  nomorDokumenPo: {matcher: new AppErrorStateMatcher(), message: 'Nomor dokumen tidak boleh kosong'},
  nomorPrefixPo: {matcher: new AppErrorStateMatcher(), message: 'Nomor prefix tidak boleh kosong'},
  tanggalPemesanan: {matcher: new AppErrorStateMatcher(), message: 'Tanggal Pemesanan tidak boleh kosong'},
  supplier: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda memilih supplier'},
  pelanggan: {matcher: new AppErrorStateMatcher(), message: 'Pastikan nama pelanggannya'},
  namaPic: {matcher: new AppErrorStateMatcher(), message: 'PIC tidak boleh kosong'},
};


/** Fungsi Init Reactive Form Group untuk data Pemesanan Pembelian Detail Warna*/
export function pemesananPembelianDetailWarnaForm(init: any = pemesananPembelianDetailWarnaInit,
                                                   disables = pemesananPembelianDetailWarnaDisables,
                                                   initAuditForm: Function = appAuditEntityForm): FormGroup {
  return new FormBuilder().group({
    ...initAuditForm(init, disables).controls,
    warna: masterWarnaForm(init.warna, {...masterWarnaDisables, uuid: true}, true),
    jumlah: [{value: init.jumlah, disabled: disables.jumlah}, Validators.required],
    unit: masterUnitForm(init.unit, {...masterUnitDisables, uuid: true}, true),
    catatan: {value: init.catatan, disabled: disables.catatan},
    nomorMatching: [{value: init.nomorMatching, disabled: disables.nomorMatching}, Validators.required],
    forRetail: {value: init.forRetail, disabled: disables.forRetail},
  });
}

function generatePemesananPembelianDetailWarna(temp: PemesananPembelianDetailWarna[]) {
  const data = [];
  temp.forEach(value => data.push(pemesananPembelianDetailWarnaForm(value)));
  return data;
}


/** Fungsi Init Reactive Form Group untuk data Pemesanan Pembelian Detail*/
export function pemesananPembelianDetailForm(init: any = pemesananPembelianDetailInit,
                                              disables = pemesananPembelianDetailDisables,
                                              initAuditForm: Function = appAuditEntityForm): FormGroup {

  const detailWarna = (init.detailWarna.length === 0) ? [] : generatePemesananPembelianDetailWarna(init.detailWarna);

  return new FormBuilder().group({
    ...initAuditForm(init, disables).controls,
    item: masterItemForm(init.item, {...masterItemDisables, uuid: true}),
    catatan: {value: init.catatan, disabled: disables.catatan},
    detailWarna: new FormBuilder().array(detailWarna),
    namaAlias: masterItemNamaAliasForm(init.namaAlias, {...masterItemNamaAliasDisables, uuid: true}, true),
  });
}

function generatePemesananPembelianDetail(temp: PemesananPembelianDetail[]) {
  const data = [];
  temp.forEach(value => data.push(pemesananPembelianDetailForm(value)));
  return data;
}

/** Fungsi Init Reactive Form Group untuk data Pemesanan Pembelian */
export function pemesananPembelianForm(init: any = pemesananPembelianInit,
                                        disables = pemesananPembelianDisables,
                                        initAuditForm: Function = appAuditEntityForm): FormGroup {

  /** megeneralisasi nilai2 array dari detail item */
  const detail = (init.detail.length === 0) ? [] : generatePemesananPembelianDetail(init.detail);

  return new FormBuilder().group({
    ...initAuditForm(init, disables).controls,
    // permintaanPembelian: permintaanPembelianForm(init.permintaanPembelian, {...permintaanPembelianDisables, uuid: true}, true),
    permintaanPembelian: new FormBuilder().group({
      uuid: {value: (init.permintaanPembelian) ? qualifyObject(init.permintaanPembelian, UUID_COLUMN) : '', disabled: false}
    }),
    catatan: {value: qualifyObject(init, 'catatan'), disabled: disables.catatan},
    counterPo: [{value: qualifyObject(init, 'catatan'), disabled: disables.counterPo}, Validators.required],
    detail: new FormBuilder().array(detail),
    salesman: penggunaForm(init.salesman, {...penggunaDisables, uuid: true}, true),
    nomorDokumenPo: [{value: qualifyObject(init, 'nomorDokumenPo'), disabled: disables.nomorDokumenPo}, Validators.required],
    poApprovedBy: new FormBuilder().group({
      uuid: {value: ((init.poApprovedBy === undefined || init.poApprovedBy === null) ? '' : init.poApprovedBy.uuid), disabled: disables.poApprovedBy}
    }),
    poApprovedDate: {value: qualifyObject(init, 'poApprovedDate'), disabled: disables.poApprovedDate},
    poCanceledDate: {value: qualifyObject(init, 'poCanceledDate'), disabled: disables.poCanceledDate},
    poCanceledReason: {value: qualifyObject(init, 'poCanceledReason'), disabled: disables.poCanceledReason},
    poCancelledBy: new FormBuilder().group({
      uuid: {value: ((init.poCancelledBy === undefined || init.poCancelledBy === null) ? '' : init.poCancelledBy.uuid), disabled: disables.poCancelledBy},
    }),
    nomorPrefixPo: [{value: qualifyObject(init, 'nomorPrefixPo'), disabled: disables.nomorPrefixPo}, Validators.required],
    statusDokumenPo: {value: qualifyObject(init, 'statusDokumenPo'), disabled: disables.statusDokumenPo},

    tanggalPemesanan: [{value: qualifyObject(init, 'tanggalPemesanan'), disabled: disables.tanggalPemesanan}, Validators.required],
    supplier: masterSupplierForm(init.supplier, {...masterSupplierDisables, uuid: true}, true),
    pelanggan: masterPelangganForm(init.pelanggan, {...masterPelangganDisables, uuid: true}, true),
    namaPic: [{value: qualifyObject(init, 'namaPic'), disabled: disables.namaPic}, Validators.required],
    urgent: {value: qualifyObject(init, 'urgent'), disabled: disables.urgent}
  });

}




