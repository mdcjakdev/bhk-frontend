import {FormBuilder, FormGroup} from '@angular/forms';
import {qualifyObject} from '../shared/utils';

/**
 * Mendefinisikan standard dari model tabel yang ada di database
 */
export interface AppBasicEntity {

  /** Primary key dari tiap tabel */
  uuid: string;

  /** Tanggal ketika dimana data tersebut dibuat */
  createdDate?: string;

  /** Tanggal ketika dimana data terakhir diubah */
  lastModifiedDate?: string;

}


/**
 * Mendefinisikan standard dari model tabel yang ada di database dengan beberapa attribut tambahan
 * yang bisa digunakan untuk mengaudit data
 */
export interface AppAuditEntity extends AppBasicEntity {


  /** Tanggal ketika dimana data tersebut dibuat oleh siapa */
  createdBy?: string;

  /** Tanggal ketika dimana data terakhir diubah oleh siapa */
  lastModifiedBy?: string;

}

/** Init model awal dari basic entity */
export const appBasicEntityInit = <AppBasicEntity>{
  uuid: '',
  createdDate: '',
  lastModifiedDate: ''
};


export const appBasicEntityDisables = {
  uuid: false,
  createdDate: false,
  lastModifiedDate: false
};


/** Init model awal dari audit entity */
export const appAuditEntityInit = <AppAuditEntity>{
  ...appBasicEntityInit,
  createdBy: '',
  lastModifiedBy: ''
};

export const appAuditEntityDisables = {
  ...appBasicEntityDisables,
  createdBy: false,
  lastModifiedBy: false
};


/** Inisialisasi form rective model dari basic entity */
export function appBasicEntityForm(init: any = appBasicEntityInit, disables = appBasicEntityDisables): FormGroup {
  return new FormBuilder().group({
    uuid: {value: qualifyObject(init, 'uuid'), disabled: disables.uuid },
    createdDate: {value: qualifyObject(init, 'createdDate'), disabled: disables.createdDate },
    lastModifiedDate: {value: qualifyObject(init, 'lastModifiedDate'), disabled: disables.lastModifiedDate },
  });
}

/**
 * Inisialisasi form rective model dari audit entity
 * @param initForm Function form init awal yang merupakan AppBasicEntity
 * @param init inisaisasi awal dari basic model entity
 */
export function appAuditEntityForm(init: any = appAuditEntityInit,
                                   disables = appAuditEntityDisables,
                                   initForm: Function = appBasicEntityForm): FormGroup {
  return new FormBuilder().group({
    ...initForm(init, disables).controls,
    createdBy: {value: qualifyObject(init, 'createdDate'), disabled: disables.createdBy},
    lastModifiedBy: {value: qualifyObject(init, 'lastModifiedDate'), disabled: disables.lastModifiedBy},
  });
}
