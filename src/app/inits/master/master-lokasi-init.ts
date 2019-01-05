import {AppErrorStateMatcher} from '../../shared/utils';
import {AppAuditEntity, appAuditEntityForm, appAuditEntityInit} from '../init';
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
export function masterLokasiForm(init: MasterLokasi = masterLokasiInit,
                                    disables = masterLokasiDisables,
                                    initAuditForm: Function = appAuditEntityForm): FormGroup {

  return new FormBuilder().group({
    ...initAuditForm().controls,
    namaLokasi: [{value: init.namaLokasi, disabled: disables.namaLokasi}, Validators.required],
    tipeLokasi: [{value: init.tipeLokasi, disabled: disables.tipeLokasi}, Validators.required]
  });

}



