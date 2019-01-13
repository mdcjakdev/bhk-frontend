import {AppAuditEntity, appAuditEntityDisables, appAuditEntityForm, appAuditEntityInit} from '../init';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppErrorStateMatcher, statusGeneralization} from '../../shared/utils';
import {
  MasterCategory,
  masterCategoryDisables, masterCategoryErrorStateMatchers, masterCategoryForm,
  masterCategoryInit,
  MasterSubCategory,
  masterSubCategoryDisables, masterSubCategoryErrorStateMatchers, masterSubCategoryForm,
  masterSubCategoryInit
} from './master-category-init';
import {MasterUnit, masterUnitDisables, masterUnitErrorStateMatchers, masterUnitForm, masterUnitInit} from './master-unit-init';
import {MasterWarna, masterWarnaDisables, masterWarnaForm, masterWarnaInit} from './master-warna';


/** Model Class Master Item Barcode */
export interface MasterItemNamaAlias extends AppAuditEntity {
  namaAlias?: string;
}

/** Model Class Master Item Nama Alias */
export interface MasterItemBarcode extends AppAuditEntity {
  barcode?: string;
}

/** Model Class Master Item */
export interface MasterItem extends AppAuditEntity {
  kode?: string;
  barcode?: MasterItemBarcode[];
  namaKain?: string;
  kodeItemAlias?: string;
  namaAlias?: MasterItemNamaAlias[];
  namaItem?: string;
  ukuran?: string;
  benang?: string;
  jenisKain?: string;
  gramasi?: string;
  setting?: string;
  handfeel?: string;
  kategori?: MasterCategory;
  subKategori?: MasterSubCategory;
  unit?: MasterUnit;
  tambahan?: string;
  warna?: MasterWarna[];
}

/** Init nilai awal Master Item Barcode */
export const masterItemBarcodeInit = {
  ...appAuditEntityInit,
  barcode: ''
};

/** Init nilai awal Master Item Nama Alias */
export const masterItemNamaAliasInit = {
  ...appAuditEntityInit,
  namaAlias: ''
};

/** Init nilai awal Master Item */
export const masterItemInit = {
  ...appAuditEntityInit,
  kode: '',
  barcode: [],
  namaKain: '',
  kodeItemAlias: '',
  namaAlias: [],
  namaItem: '',
  ukuran: '',
  benang: '',
  jenisKain: '',
  gramasi: '',
  setting: '',
  handfeel: '',
  kategori: masterCategoryInit,
  subKategori: masterSubCategoryInit,
  unit: masterUnitInit,
  tambahan: '',
  warna: []
};

/** Init nilai awal status disable formcontrol Master Item Barcode */
export const masterItemBarcodeDisables = {
  ...appAuditEntityDisables,
  barcode: false
};

/** Init nilai awal status disable formcontrol Master Item Nama Alias */
export const masterItemNamaAliasDisables = {
  ...appAuditEntityDisables,
  namaAlias: false
};

/** Init nilai awal status disable formcontrol Kategori */
export const masterItemDisables = {
  ...appAuditEntityDisables,
  kode: false,
  namaKain: true,
  kodeItemAlias: false,
  namaItem: false,
  ukuran: false,
  benang: false,
  jenisKain: false,
  gramasi: false,
  setting: false,
  handfeel: false,
  kategori: false,
  subKategori: false,
  unit: false,
  tambahan: false,
  warna: false
};

/** Init StateMatcher formcontrol Master Item Barcode */
export const masterItemBarcodeErrorStateMatchers = {
  barcode: {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan barcode'
  }
};

/** Init StateMatcher formcontrol Master Item Nama Alias */
export const masterItemNamaAliasErrorStateMatchers = {
  namaAlias: {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan nama alias'
  }
};

/** Init StateMatcher formcontrol Master Item */
export const masterItemErrorStateMatchers = {
  kode: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda menginputkan kode'},
  barcode: masterItemBarcodeErrorStateMatchers,
  namaKain: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda menginputkan kode'},
  kodeItemAlias: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda menginputkan kode'},
  namaAlias: masterItemNamaAliasErrorStateMatchers,
  namaItem: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda menginputkan kode'},
  ukuran: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda menginputkan kode'},
  benang: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda menginputkan kode'},
  jenisKain: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda menginputkan kode'},
  // gramasi: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda menginputkan kode'},
  // setting: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda menginputkan kode'},
  // handfeel: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda menginputkan kode'},
  kategori: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda menginputkan kategori'},
  subKategori: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda menginputkan sub kategori'},
  unit: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda memilih unit'},
  // tambahan: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda menginputkan kode'},
  warna: {matcher: new AppErrorStateMatcher(), message: 'Pastikan anda menginputkan memilih warna'},
};


/** Fungsi Init Reactive Form Group untuk data Master Item Barcode  */
export function masterItemBarcodeForm(init = masterItemBarcodeInit,
                                      disables = masterItemBarcodeDisables,
                                      initAuditForm: Function = appAuditEntityForm): FormGroup {
  return new FormBuilder().group({
    ...initAuditForm().controls,
    barcode: [{value: init.barcode, disabled: disables.barcode}, Validators.required]
  });
}
function generateMasterItemBarcode(temp: any[]) {
  const data = [];
  temp.forEach(value => data.push(masterItemBarcodeForm(value)));
  return data;
}


/** Fungsi Init Reactive Form Group untuk data Master Item Nama Alias */
export function masterItemNamaAliasForm(init: any = masterItemNamaAliasInit,
                                      disables = masterItemNamaAliasDisables,
                                      forGeneralization = false,
                                      initAuditForm: Function = appAuditEntityForm): FormGroup {
  return new FormBuilder().group({
    ...initAuditForm(init, disables).controls,
    namaAlias: [{value: init.namaAlias, disabled: disables.namaAlias}, statusGeneralization(Validators.required, forGeneralization)]
  });
}
function generateMasterItemNamaAlias(temp: MasterItemNamaAlias[]) {
  const data = [];
  temp.forEach(value => data.push(masterItemNamaAliasForm(value)));
  return data;
}

/** Fungsi Init Reactive Form Group untuk data Master Item Nama Alias */
export function masterItemWarnaRelationForm(init = masterWarnaInit,
                                        initAuditForm: Function = appAuditEntityForm): FormGroup {
  return new FormBuilder().group({
    ...initAuditForm().controls,
    uuid: [{value: init.uuid, disabled: true}, Validators.required]
  });
}
export function generateMasterItemWarnaRelation(temp: MasterWarna[]) {
  const data = [];
  temp.forEach(value => data.push(masterWarnaForm(value)));
  return data;
}


/** Fungsi Init Reactive Form Group untuk data Master Item */
export function masterItemForm(init: any = masterItemInit,
                                   disables = masterItemDisables,
                                   initAuditForm: Function = appAuditEntityForm): FormGroup {

  /** megeneralisasi nilai2 array dari barcode */
  const barcode = (init.barcode.length === 0) ? [] : generateMasterItemBarcode(init.barcode);

  /** megeneralisasi nilai2 array dari nama alias */
  const namaAlias = (init.namaAlias.length === 0) ? [] : generateMasterItemNamaAlias(init.namaAlias);

  /** megeneralisasi nilai2 array dari nama alias */
  const warna = (init.warna.length === 0) ? [] : generateMasterItemWarnaRelation(init.warna);

  return new FormBuilder().group({
    ...initAuditForm(init, disables).controls,
    kode: [{value: init.kode, disabled: disables.kode}, Validators.required],
    barcode: new FormBuilder().array(barcode),
    namaKain: [{value: init.namaKain, disabled: disables.namaKain}, Validators.required],
    kodeItemAlias: [{value: init.kodeItemAlias, disabled: disables.kodeItemAlias}, Validators.required],
    namaAlias: new FormBuilder().array(namaAlias),
    namaItem: [{value: init.namaItem, disabled: disables.namaItem}, Validators.required],
    ukuran: [{value: init.ukuran, disabled: disables.ukuran}, Validators.required],
    benang: [{value: init.benang, disabled: disables.benang}, Validators.required],
    jenisKain: [{value: init.jenisKain, disabled: disables.jenisKain}, Validators.required],
    gramasi: {value: init.gramasi, disabled: disables.gramasi},
    setting: {value: init.setting, disabled: disables.setting},
    handfeel: {value: init.handfeel, disabled: disables.handfeel},
    kategori: new FormBuilder().group({
      uuid: [{value: init.kategori.uuid, disabled: disables.kategori}, Validators.required]
    }),
    subKategori: new FormBuilder().group({
      uuid: [{value: init.subKategori.uuid, disabled: disables.subKategori}, Validators.required]
    }),
    unit: new FormBuilder().group({
      uuid: [{value: init.unit.uuid, disabled: disables.unit }, Validators.required]
    }),
    tambahan: {value: init.tambahan, disabled: disables.tambahan},
    warna: new FormBuilder().array(warna)
  });

}

