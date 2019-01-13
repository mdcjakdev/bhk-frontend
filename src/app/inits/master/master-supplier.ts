import {AppAuditEntity, appAuditEntityDisables, appAuditEntityForm, appAuditEntityInit} from '../init';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppErrorStateMatcher, statusGeneralization} from '../../shared/utils';

/** Model Class MasterSupplier */
export interface MasterSupplier extends AppAuditEntity {
  alamat?: string;
  email?: string;
  fax?: string;
  kodeSupplier?: string;
  kodeTrans?: string;
  nama?: string;
  paymentDueDate?: any;
  picName?: string;
  picNumber?: string;
  telepon?: string;
}

/** Init nilai awal MasterSupplier */
export const masterSupplierInit = {
  ...appAuditEntityInit,
  alamat: '',
  email: '',
  fax: '',
  kodeSupplier: '',
  kodeTrans: '',
  nama: '',
  paymentDueDate: '',
  picName: '',
  picNumber: '',
  telepon: ''
};


/** Init nilai awal status disable formcontrol MasterSupplier */
export const masterSupplierDisables = {
  ...appAuditEntityDisables,
  alamat: false,
  email: false,
  fax: false,
  kodeSupplier: false,
  kodeTrans: false,
  nama: false,
  paymentDueDate: false,
  picName: false,
  picNumber: false,
  telepon: false
};


/** Init StateMatcher formcontrol MasterSupplier */
export const masterSupplierErrorStateMatchers = {
  alamat: {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan alamat'
  },
  email: {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan email'
  },
  fax: {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan fax'
  },
  kodeSupplier: {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan kode'
  },
  kodeTrans: {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan kode trans'
  },
  nama: {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan nama supplier'
  },
  paymentDueDate: {
    matcher: new AppErrorStateMatcher(),
    message: 'Inputkan tanggal dengan benar'
  },
  // picName: {
  //   matcher: new AppErrorStateMatcher(),
  //   message: 'Tidak boleh kosong'
  // },
  // picNumber: {
  //   matcher: new AppErrorStateMatcher(),
  //   message: 'Tidak boleh kosong'
  // },
  // telepon: {
  //   matcher: new AppErrorStateMatcher(),
  //   message: 'Pastikan anda menginputkan nomor telepon'
  // }
};


/** Fungsi Init Reactive Form Group untuk data MasterSupplier */
export function masterSupplierForm(init: any = masterSupplierInit,
                                   disables = masterSupplierDisables,
                                   forGeneralization = false,
                                   initAuditForm: Function = appAuditEntityForm): FormGroup {

  return new FormBuilder().group({
    ...initAuditForm(init, disables).controls,
    alamat: [{value: init.alamat, disabled: disables.alamat}, statusGeneralization(Validators.required, forGeneralization)],
    email: [{value: init.email, disabled: disables.email}, statusGeneralization(Validators.email, forGeneralization)],
    fax: [{value: init.fax, disabled: disables.fax}, statusGeneralization(Validators.required, forGeneralization)],
    kodeSupplier: [{value: init.kodeSupplier, disabled: disables.kodeSupplier}, statusGeneralization(Validators.required, forGeneralization)],
    kodeTrans: [{value: init.kodeTrans, disabled: disables.kodeTrans}, statusGeneralization(Validators.required, forGeneralization)],
    nama: [{value: init.nama, disabled: disables.nama}, statusGeneralization(Validators.required, forGeneralization)],
    paymentDueDate: [{value: init.paymentDueDate, disabled: disables.paymentDueDate}, statusGeneralization(Validators.required, forGeneralization)],
    picName: {value: init.picName, disabled: disables.picName},
    picNumber: {value: init.picNumber, disabled: disables.picNumber},
    telepon: {value: init.telepon, disabled: disables.telepon}
  });

}

