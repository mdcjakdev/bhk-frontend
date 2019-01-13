import {AppAuditEntity, appAuditEntityDisables, appAuditEntityForm, appAuditEntityInit} from '../init';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppErrorStateMatcher} from '../../shared/utils';

export const tipeKategori = [
  'Raw Material',
  'Work in progress',
  'Finish Good'
];

/** Model Class Sub Kategori */
export interface MasterSubCategory extends AppAuditEntity {
  kode?: string;
  nama?: string;
}

/** Model Class Kategori */
export interface MasterCategory extends AppAuditEntity {
  kodeKategori?: string;
  tipeKategori?: string;
  namaKategori?: string;
  subKategori?: MasterSubCategory[];
}

/** Init nilai awal Sub Kategori */
export const masterSubCategoryInit = {
  ...appAuditEntityInit,
  kode: '',
  nama: ''
};

/** Init nilai awal Kategori */
export const masterCategoryInit = {
  ...appAuditEntityInit,
  kodeKategori: '',
  tipeKategori: '',
  namaKategori: '',
  subKategori: []
};

/** Init nilai awal status disable formcontrol Sub Kategori */
export const masterSubCategoryDisables = {
  ...appAuditEntityDisables,
  kode: false,
  nama: false
};

/** Init nilai awal status disable formcontrol Kategori */
export const masterCategoryDisables = {
  ...appAuditEntityDisables,
  kodeKategori: false,
  tipeKategori: false,
  namaKategori: false
};

/** Init StateMatcher formcontrol Sub Kategori */
export const masterSubCategoryErrorStateMatchers = {
  kode: {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan kode'
  },
  nama: {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan nama'
  }
};

/** Init StateMatcher formcontrol Kategori */
export const masterCategoryErrorStateMatchers = {
  kodeKategori: {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan kode'
  },
  tipeKategori: {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan tipe'
  },
  namaKategori: {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan nama'
  },
  subKategori: masterSubCategoryErrorStateMatchers
};


/** Fungsi Init Reactive Form Group untuk data Sub Category */
export function masterSubCategoryForm(init: any = masterSubCategoryInit,
                                      disables = masterSubCategoryDisables,
                                      initAuditForm: Function = appAuditEntityForm): FormGroup {
  return new FormBuilder().group({
    ...initAuditForm(init, disables).controls,
    kode: [{value: init.kode, disabled: disables.kode}, Validators.required],
    nama: [{value: init.nama, disabled: disables.nama}, Validators.required],
  });
}

function generateSubCategory(dataSubKategori: MasterSubCategory[]) {
  const data = [];

  dataSubKategori.forEach(value => {
    data.push(masterSubCategoryForm(value));
  });

  return data;
}

/** Fungsi Init Reactive Form Group untuk data Category */
export function masterCategoryForm(init: any = masterCategoryInit,
                                   disables = masterCategoryDisables,
                                   initAuditForm: Function = appAuditEntityForm): FormGroup {

  /** megeneralisasi nilai2 array dari sub kategori */
  const dataSubKategori = (init.subKategori.length === 0) ? [] : generateSubCategory(init.subKategori);

  return new FormBuilder().group({
    ...initAuditForm().controls,
    kodeKategori: [{value: init.kodeKategori, disabled: disables.kodeKategori}, Validators.required],
    tipeKategori: [{value: init.tipeKategori, disabled: disables.tipeKategori}, Validators.required],
    namaKategori: [{value: init.namaKategori, disabled: disables.namaKategori}, Validators.required],
    subKategori: new FormBuilder().array(dataSubKategori) // init kosong untuk data relasi ke banyak
  });

}

