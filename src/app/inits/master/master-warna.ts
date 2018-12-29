
import {AppAuditEntity, appAuditEntityForm, appAuditEntityInit} from '../init';
import {AppErrorStateMatcher} from '../../shared/utils';
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
export const masterWarnaBarcodeInit = <MasterWarnaBarcode>{
  ...appAuditEntityInit,
  barcode: ''
};

/** Init nilai awal Kategori */
export const masterWarnaInit = <MasterWarna>{
  ...appAuditEntityInit,
  kodeWarna: '',
  kodeWarnaHexadecimal: defaultColor,
  namaWarna: '',
  barcode: []
};

/** Init nilai awal status disable formcontrol Master Warna Barcode  */
export const masterWarnaBarcodeDisables = {
  barcode: false
};

/** Init nilai awal status disable formcontrol Master Warna */
export const masterWarnaDisables = {
  kodeWarna: false,
  namaWarna: false,
  kodeWarnaHexadecimal: true,
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
export function masterWarnaBarcodeForm(init: MasterWarnaBarcode = masterWarnaBarcodeInit,
                                      disables = masterWarnaBarcodeDisables,
                                      initAuditForm: Function = appAuditEntityForm): FormGroup {
  return new FormBuilder().group({
    ...initAuditForm().controls,
    barcode: [{value: init.barcode, disabled: disables.barcode}, Validators.required]
  });
}

function generateWarnaBarcode(barcodes: MasterWarnaBarcode[]) {
  const data = [];
  barcodes.forEach(value => data.push(masterWarnaBarcodeForm(value)));
  return data;
}

/** Fungsi Init Reactive Form Group untuk data Master Warna */
export function masterWarnaForm(init: MasterWarna = masterWarnaInit,
                                   disables = masterWarnaDisables,
                                   initAuditForm: Function = appAuditEntityForm): FormGroup {

  /** megeneralisasi nilai2 array dari warna barcode */
  const warnaBarcode = (init.barcode.length === 0) ? [] : generateWarnaBarcode(init.barcode);

  return new FormBuilder().group({
    ...initAuditForm(init).controls,
    kodeWarna: [{value: init.kodeWarna, disabled: disables.kodeWarna}, Validators.required],
    kodeWarnaHexadecimal: {value: init.kodeWarnaHexadecimal, disabled: disables.kodeWarnaHexadecimal},
    namaWarna: [{value: init.namaWarna, disabled: disables.namaWarna}, Validators.required],
    barcode: new FormBuilder().array(warnaBarcode) // init kosong untuk data relasi ke banyak
  });

}

