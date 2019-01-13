import {AppAuditEntity, appAuditEntityDisables, appAuditEntityForm, appAuditEntityInit} from '../init';
import {AppErrorStateMatcher, statusGeneralization} from '../../shared/utils';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


export const defaultColor = '#CBCBCB';

/** Model Class Warna Barcode */
export interface MasterWarnaBarcode extends AppAuditEntity {
  barcode?: string;
}

/** Model Class Master Warna */
export interface MasterWarna extends AppAuditEntity {
  kodeWarna?: string;
  kodeWarnaHexadecimal?: string;
  namaWarna?: string;
  barcode?: MasterWarnaBarcode[];
}

/** Init nilai awal Warna Barcode */
export const masterWarnaBarcodeInit = {
  ...appAuditEntityInit,
  barcode: ''
};

/** Init nilai awal Kategori */
export const masterWarnaInit = {
  ...appAuditEntityInit,
  kodeWarna: '',
  kodeWarnaHexadecimal: defaultColor,
  namaWarna: '',
  barcode: []
};

/** Init nilai awal status disable formcontrol Master Warna Barcode  */
export const masterWarnaBarcodeDisables = {
  ...appAuditEntityDisables,
  barcode: false
};

/** Init nilai awal status disable formcontrol Master Warna */
export const masterWarnaDisables = {
  ...appAuditEntityDisables,
  kodeWarna: false,
  namaWarna: false,
  kodeWarnaHexadecimal: false,
  barcode: masterWarnaBarcodeDisables
};

/** Init StateMatcher formcontrol Master Warna Barcode */
export const masterWarnaBarcodeErrorStateMatchers = {
  barcode: {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan kode barcodee'
  }
};

/** Init StateMatcher formcontrol Master Warna Barcode */
export const masterWarnaErrorStateMatchers = {
  kodeWarna: {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan kode'
  },
  namaWarna: {
    matcher: new AppErrorStateMatcher(),
    message: 'Pastikan anda menginputkan nama warna'
  },
  barcode: masterWarnaBarcodeErrorStateMatchers
};


/** Fungsi Init Reactive Form Group untuk data Master Warna Barcode */
export function masterWarnaBarcodeForm(init = masterWarnaBarcodeInit,
                                       disables = masterWarnaBarcodeDisables,
                                       forGeneralization = false,
                                       initAuditForm: Function = appAuditEntityForm): FormGroup {
  return new FormBuilder().group({
    ...initAuditForm(init, disables).controls,
    barcode: [{value: init.barcode, disabled: disables.barcode}, statusGeneralization(Validators.required, forGeneralization)]
  });
}

function generateWarnaBarcode(barcodes: any[], forGeneralization = false) {
  const data = [];
  barcodes.forEach((value: any) => data.push(masterWarnaBarcodeForm(value, {...masterWarnaBarcodeDisables, uuid: forGeneralization}, forGeneralization)));
  return data;
}

/** Fungsi Init Reactive Form Group untuk data Master Warna */
export function masterWarnaForm(init: any = masterWarnaInit,
                                disables = masterWarnaDisables,
                                forGeneralization = false,
                                initAuditForm: Function = appAuditEntityForm): FormGroup {

  /** megeneralisasi nilai2 array dari warna barcode */
  const warnaBarcode = (init.barcode === undefined || init.barcode.length === 0) ? [] : generateWarnaBarcode(init.barcode, forGeneralization);

  return new FormBuilder().group({
    ...initAuditForm(init).controls,
    kodeWarna: [{value: init.kodeWarna, disabled: disables.kodeWarna}, statusGeneralization(Validators.required, forGeneralization)],
    kodeWarnaHexadecimal: {value: init.kodeWarnaHexadecimal, disabled: disables.kodeWarnaHexadecimal},
    namaWarna: [{value: init.namaWarna, disabled: disables.namaWarna}, statusGeneralization(Validators.required, forGeneralization)],
    barcode: new FormBuilder().array(warnaBarcode) // init kosong untuk data relasi ke banyak
  });

}

