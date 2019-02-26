import {AppErrorStateMatcher, statusGeneralization} from '../../shared/utils';
import {AppAuditEntity, appAuditEntityDisables, appAuditEntityForm, appAuditEntityInit} from '../init';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

export const tipeLokasi = [
  'Gudang',
  'Gudang & Toko',
  'Toko'
];

export interface MasterLokasi extends AppAuditEntity {
  namaLokasi?: string;
  tipeLokasi?: string;
}

export const masterLokasiInit = {
  ...appAuditEntityInit,
  namaLokasi: '',
  tipeLokasi: ''
};

export const masterLokasiDisables = {
  ...appAuditEntityDisables,
  namaLokasi: false,
  tipeLokasi: false
};

/** Init StateMatcher formcontrol Master Lokasi */
export const masterLokasiErrorStateMatchers = {
  namaLokasi: {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan alamat'
  },
  tipeLokasi: {
    matcher: new AppErrorStateMatcher(),
    message: 'Tipe Lokasi Tidak boleh kosong'
  },
};


/** Fungsi Init Reactive Form Group untuk data Master Lokasi*/
export function masterLokasiForm(init: any = masterLokasiInit,
                                 disables = masterLokasiDisables,
                                 forGeneralization = false,
                                 initAuditForm: Function = appAuditEntityForm): FormGroup {

  return new FormBuilder().group({
    ...initAuditForm(init, disables).controls,
    namaLokasi: [{value: init.namaLokasi, disabled: disables.namaLokasi}, statusGeneralization(Validators.required, forGeneralization)],
    tipeLokasi: [{value: init.tipeLokasi, disabled: disables.tipeLokasi}, statusGeneralization(Validators.required, forGeneralization)]
  });

}



