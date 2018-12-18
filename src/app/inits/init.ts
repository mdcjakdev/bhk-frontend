import {FormBuilder, FormGroup} from '@angular/forms';

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

/** Init model awal dari audit entity */
export const appAuditEntityInit = {
  ...appBasicEntityInit,
  createdBy: '',
  lastModifiedBy: ''
};


/** Inisialisasi form rective model dari basic entity */
export function appBasicEntityForm(init: AppBasicEntity = appBasicEntityInit): FormGroup {
  return new FormBuilder().group({
    uuid: {value: init.uuid, disabled: false},
    createdDate: {value: init.createdDate, disabled: false},
    lastModifiedDate: {value: init.lastModifiedDate, disabled: false},
  });
}

/**
 * Inisialisasi form rective model dari audit entity
 * @param initForm Function form init awal yang merupakan AppBasicEntity
 * @param init inisaisasi awal dari basic model entity
 */
export function appAuditEntityForm(init: AppAuditEntity = appAuditEntityInit,
                                   initForm: Function = appBasicEntityForm): FormGroup {
  return new FormBuilder().group({
    ...initForm().controls,
    createdBy: {value: init.createdDate, disabled: false},
    lastModifiedBy: {value: init.lastModifiedDate, disabled: false},
  });
}
