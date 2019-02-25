import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {DialogUtil} from '../../../../../shared/dialog-util';
import {
  MAT_DIALOG_DATA,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatBottomSheet,
  MatDialog,
  MatDialogRef,
  MatSelect,
  MatSnackBar
} from '@angular/material';
import {Ui} from '../../../../../shared/ui';
import {first} from 'rxjs/operators';
import {
  delayHttpRequest,
  invertColor,
  openAppSnackbar,
  SNACKBAR_ERROR_STYLE,
  SNACKBAR_SUCCESS_STYLE,
  SNACKBAR_WARNING_STYLE,
  UUID_COLUMN
} from '../../../../../shared/constants';
import {AppErrorStateMatcher, qualifyObject, SUCCESS} from '../../../../../shared/utils';

import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {SelectLazy} from '../../../../../shared/select-lazy';
import {Pengguna} from '../../../../../inits/administrator/pengguna-init';
import {PenggunaService} from '../../../../../services/administrator/pengguna/pengguna.service';
import {AppHttpGenerate} from '../../../../../shared/http-generate';
import {MasterItemService} from '../../../../../services/master/master-item/master-item.service';
import {MasterItem, masterItemDisables, masterItemInit} from '../../../../../inits/master/master-item';
import {MasterWarna} from '../../../../../inits/master/master-warna';
import {
  pemesananPembelianDetailDisables,
  pemesananPembelianDetailForm,
  pemesananPembelianDetailInit,
  PemesananPembelianDetailWarna,
  pemesananPembelianDetailWarnaDisables,
  pemesananPembelianDetailWarnaForm,
  pemesananPembelianDetailWarnaInit,
  pemesananPembelianErrorStateMatchers,
  pemesananPembelianForm,
  pemesananPembelianInit
} from '../../../../../inits/purchase/po/po-init';
import {PemesananPembelianService} from '../../../../../services/purchase/po/pemesanan-pembelian.service';
import {PropertiWarnaPoComponent} from './properti-warna-po/properti-warna-po.component';
import {MasterPelangganService} from '../../../../../services/master/master-pelanggan/master-pelanggan.service';
import {MasterSupplierService} from '../../../../../services/master/master-supplier/master-supplier.service';
import {MasterPelanggan} from '../../../../../inits/master/master-pelanggan-init';
import {MasterSupplier} from '../../../../../inits/master/master-supplier';
import {PemesananPembelianSheetComponent} from './pemesanan-pembelian-sheet/pemesanan-pembelian-sheet.component';
import {appAuditEntityInit} from '../../../../../inits/init';

@Component({
  selector: 'app-pemesanan-pembelian-dialog',
  templateUrl: './pemesanan-pembelian-dialog.component.html',
  styleUrls: ['./pemesanan-pembelian-dialog.component.scss']
})
export class PemesananPembelianDialogComponent extends DialogUtil
  implements OnInit, AfterViewInit {

  documentPropertiesParams = { supplierUuid: '', hasCustomer: false, poUuid: '' };


  /* Indikator yang menandakan bahwa dokumen yang ada merupakan data dari PR (mempunya pr id)*/
  havePrId = false;

  /* indikator yang menyatakan bahwa proses checking data ke database, apakah punya pr id atau tidak berstatus gagal */
  failCheckPrId = false;

  invertColor = invertColor;

  close = undefined;

  previewValue = pemesananPembelianInit;

  /** Index dari tab yang terpilih */
  selectedIndex = 0;

  /* Jika index/tab penginputan data pemesanan pembelian telah di load(buka) */
  isPemesananPembelianLoaded = false;


  /** Control validator untuk pemilihan jenis pemesanan pembelian */
  jenisPemesanan = new FormControl(undefined, [Validators.required]);
  jenisPemesananStateMatcher = new AppErrorStateMatcher();
  /**/

  @ViewChild('selectSalesman') selectSalesman;
  salesmanLazy: SelectLazy<Pengguna>;

  @ViewChild('selectPelanggan') selectPelanggan;
  pelangganLazy: SelectLazy<MasterPelanggan>;

  @ViewChild('selectSupplier') selectSupplier;
  supplierLazy: SelectLazy<MasterSupplier>;


  itemLazy: SelectLazy<MasterItem>[] = [];

  /* Menampung data warna yang dimiliki tiap item di tiap detail data yang berada pada list dropdown */
  warnaPerItem: any[] = [];

  /* Menampung data warna untul tiap detail */
  dataWarna: any[] = [];

  /*menampung trigger tiap mat complete warna di setiap detail */
  dataWarnaTrigger: MatAutocompleteTrigger[] = [];

  documentProperties: AppHttpGenerate;

  constructor(
    private bottomSheet: MatBottomSheet,
    public dialog: MatDialog,
    private changeDetector: ChangeDetectorRef,
    public snackBar: MatSnackBar,
    public penggunaService: PenggunaService,
    public masterPelangganService: MasterPelangganService,
    public masterSupplierService: MasterSupplierService,
    public masterItemService: MasterItemService,
    public pemesananPembelianService: PemesananPembelianService,
    dialogRef: MatDialogRef<PemesananPembelianDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super(dialogRef,
      data,
      pemesananPembelianForm(data.data, data.disables),
      pemesananPembelianErrorStateMatchers);

    /** inisialisasi Generate properti dokumen seperti, nomor dokumen, prefix, counter dan tanggal PO dari server */
    this.documentProperties = new AppHttpGenerate(
      pemesananPembelianService.http,
      pemesananPembelianService.getDocumentProperties
    );

    // init untuk data salesman
    this.salesmanLazy = new SelectLazy(
      this.form,
      'salesman',
      penggunaService.http,
      penggunaService.getData,
      data.data.salesman.uuid,
      this.isInsert());


    // init untuk data pelanggan
    this.pelangganLazy = new SelectLazy(
      this.form,
      'pelanggan',
      masterPelangganService.http,
      masterPelangganService.getData,
      data.data.pelanggan.uuid,
      this.isInsert());

    // init untuk data supplier
    this.supplierLazy = new SelectLazy(
      this.form,
      'supplier',
      masterSupplierService.http,
      masterSupplierService.getData,
      data.data.supplier.uuid,
      this.isInsert());

    /** Data awal PO akan diinisialisasi secara otomatis bila aksi adalah proses update data */
    if (this.isUpdate()) {
      this.onPatchingForm(data.data);
    }



  }


  printKodeWarna(value: string) {
    return (value === undefined || value.length === 0) ? '- ' : value;
  }


  onPatchingForm(patch, fromPr = false) {
    this.selectedIndex = 1;

    if (patch.detail) {
      let i = 0;

      if (fromPr) {
        this.itemLazy = [];
      } else {
        this.initializing();
      }

      for (const detail of patch.detail) {
        this.initializePemesananDetail(
          (<FormGroup>this.reactiveFormUtil.getFormArray('detail', this.form).controls[i]),
          true,
          detail,
          i
        );
        i++;
      }
    }
  }


  /* Title dari setiap detail PO*/
  detailTitle(i: FormGroup, index) {
    if ((<FormGroup>i.controls['item']).controls['namaItem'] !== undefined) {
      if ((<FormGroup>i.controls['item']).controls[UUID_COLUMN].value === undefined ||
        (<FormGroup>i.controls['item']).controls[UUID_COLUMN].value === null) {
        return 'Silahkan Pilih Kain';
      }

      const hasUuid = (<string>(<FormGroup>i.controls['item']).controls[UUID_COLUMN].value).trim().length > 0;
      if (hasUuid) {
        return (index + 1) + '. ' + <string>(<FormGroup>i.controls['item']).controls['namaItem'].value;
      } else {
        return 'Silahkan Pilih Kain';
      }
    }
  }

  /* Menginisialisasi data yang dibutuhkan agar proses ini berjalan */
  initializing() {

    // hanya jika belum terbuka sama sekali
    if (!this.isPemesananPembelianLoaded) {
      if (this.isInsert() || this.isUpdate()) {
        this.salesmanLazy._loadMore(callback => {

          const valueIdPr = <string>(<FormGroup>this.form.controls['permintaanPembelian']).controls[UUID_COLUMN].value;
          if (valueIdPr.trim().length > 0) {
            (<FormGroup>this.form.controls['salesman']).controls[UUID_COLUMN].disable();
            this.havePrId = true;
          } else {
            this.havePrId = false;
          }

        });

        this.supplierLazy._loadMore();
        this.pelangganLazy._loadMore();
      }

      this.isPemesananPembelianLoaded = true;
    }


    if (this.isInsert() || this.isUpdate()) {

      const rawValue = this.form.getRawValue();
      const poUuid = rawValue[UUID_COLUMN];
      const customer = rawValue.pelanggan[UUID_COLUMN];
      const hasCustomer = (customer) ? (customer.trim().length > 0) : false;
      let supplierUuid = rawValue.supplier[UUID_COLUMN];
      supplierUuid = (supplierUuid === undefined) ? '' : supplierUuid;

      /* generate properti dokumen dari server */
      this.documentPropertiesParams = { supplierUuid: supplierUuid, hasCustomer: hasCustomer, poUuid: poUuid };
      this.generateDocumentProperties(this.documentPropertiesParams);
    }


  }

  ngAfterViewInit(): void {
    this.salesmanLazy.select = this.selectSalesman;
    this.supplierLazy.select = this.selectSupplier;
    this.pelangganLazy.select = this.selectPelanggan;


  }

  onTabChanged(index) {
    if (index === 1) { // tab data pemesanan pembelian

      setTimeout(() => {
        this.initializing();
      }, 0);
    }
  }

  ngOnInit() {
    const poUuid = <string> this.form.controls[UUID_COLUMN].value;

    /* Subscribe perubahan nilai supplier */
    (<FormGroup>this.form.controls['supplier']).controls[UUID_COLUMN].valueChanges.subscribe(value => {
      const customer = <string> (<FormGroup>this.form.controls['pelanggan']).controls[UUID_COLUMN].value;
      const hasCustomer = (customer) ? (customer.trim().length > 0) : false;

      const length = this.supplierLazy.data.filter(value1 => value1.uuid === value)
        .map((value2: any) => {
          this.generateDocumentProperties({ supplierUuid: value2.uuid, hasCustomer: hasCustomer, poUuid: poUuid })
        }).length;

      if (length === 0) {
        this.generateDocumentProperties({ supplierUuid: '', hasCustomer: hasCustomer, poUuid: poUuid })
      }
    });


    /* Subscribe perubahan nilai pelanggan */
    (<FormGroup>this.form.controls['pelanggan']).controls[UUID_COLUMN].valueChanges.subscribe(value => {

      let supplierUuid = (<FormGroup>this.form.controls['supplier']).controls[UUID_COLUMN].value;
      supplierUuid = (supplierUuid === undefined) ? '' : supplierUuid;

      const length = this.pelangganLazy.data.filter(value1 => value1.uuid === value)
        .map((value2: any) => {
          this.generateDocumentProperties({ supplierUuid: supplierUuid, hasCustomer: true, poUuid: poUuid })
        }).length;

      if (length === 0) {
        this.generateDocumentProperties({ supplierUuid: supplierUuid, hasCustomer: false, poUuid: poUuid })
      }
    });


    /* Subscribe perubahan nilai salesman*/
    (<FormGroup>this.form.controls['salesman']).controls[UUID_COLUMN].valueChanges.subscribe(value => {
      this.salesmanLazy.data.filter(value1 => value1.uuid === value)
        .map((value2: any) => {
          (<FormGroup>(<FormGroup>this.form.controls['salesman']).controls['karyawan']).patchValue(value2.karyawan);
        });
    });

    // set control jenis pemesanan telah di klik
    this.jenisPemesanan.markAsTouched({onlySelf: true});


    this.checkPrId();
  }


  checkPrId(controlToDisable?) {
    this.havePrId = false; /**/
    if (this.isUpdate()) {
      this.pemesananPembelianService.checkPrByPoId(this.form.controls[UUID_COLUMN].value)
        .subscribe((value: any) => {
            if (value.prId) {
              (<FormGroup>this.form.controls['permintaanPembelian']).controls[UUID_COLUMN].setValue(value.prId);
              this.havePrId = true;

              if (this.failCheckPrId && controlToDisable) {
                (<FormGroup>this.form.controls[controlToDisable]).controls[UUID_COLUMN].disable();
              }

            }
          },
          error1 => this.failCheckPrId = true);
    }
  }


  /* */
  refreshSalesman() {
    this.salesmanLazy.refresh(data1 => {
      this.checkPrId('salesman');
    });
  }

  /* Menginisialisasi init item detail untuk PO pada dropdown dengan metode lazy load */
  initItemMasterSelect(i, uuid = '', fg = pemesananPembelianDetailForm()) {
    this.itemLazy.push(new SelectLazy(fg,
      'item',
      this.masterItemService.http,
      this.masterItemService.getData,
      uuid,
      (this.isInsert()) ? this.isInsert() : true)
    );
  }

  setDocumentPropertiesToEmpty() {
    this.form.controls['tanggalPemesanan'].setValue('');
    this.form.controls['nomorDokumenPo'].setValue('');
    this.form.controls['counterPo'].setValue('');
    this.form.controls['nomorPrefixPo'].setValue('');
  }

  /* mengambil properti dokumen PO dari server*/
  generateDocumentProperties(params = this.documentPropertiesParams,
                             success?: (value: any) => void, failed?: (error: any) => void) {
    this.setDocumentPropertiesToEmpty();

    this.documentProperties.generate(value => {
      this.form.controls['tanggalPemesanan'].setValue(value['date']);
      this.form.controls['nomorDokumenPo'].setValue(value['nomorDokumen']);
      this.form.controls['counterPo'].setValue(value['counter']);
      this.form.controls['nomorPrefixPo'].setValue(value['prefix']);
      if (success) {
        success(value);
      }
    }, error => {
      this.setDocumentPropertiesToEmpty();
      if (failed) {
        failed(error);
      }
    }, params);
  }


  /* Kondisi yang digunakan untuk menampilkan tombol kembali*/
  sebelumnyaCondition() {
    if (this.isInsert()) {
      return this.selectedIndex > 0;
    } else if (this.isUpdate()) {
      if (this.selectedIndex === 1) {
        return false;
      } else {
        return true;
      }
    }
  }

  /* Kondisi yang digunkakan sebagai aturan untuk proses disable dan enable tombol selanjutnya*/
  selanjutnyaCondition() {
    if (this.selectedIndex === 0) {
      return this.jenisPemesanan.invalid;
    } else if (this.selectedIndex === 1) {
      if (this.isInsert()) {
        return (
          (this.documentProperties.waiting || this.documentProperties.failed) ||
          this.salesmanLazy.failToFetch || this.supplierLazy.failToFetch || this.pelangganLazy.failToFetch ||
          this.form.invalid
        );
      } else {
        return (
          (!this.salesmanLazy.isUuidTrue) || (!this.supplierLazy.isUuidTrue) || (!this.pelangganLazy.isUuidTrue) ||
          this.form.invalid
        );
      }
    } else {

    }
  }

  /* aksi dari tombol lanjut */
  next() {
    if (this.selectedIndex === 2) {
      this.save(this.form.getRawValue());
    } else {
      if (this.selectedIndex === 1) {

        if (this.poDetailCount() === 0) {
          openAppSnackbar(this.snackBar, 'Daftar Pemesanan Barang tidak boleh kosong ...', SNACKBAR_WARNING_STYLE, 2000);
          return;
        }

        // cek apakah ada detail warna yang kosong pada detail pemesanan
        const check = this.poDetailWarnaCheck();
        if (check.isEmpty) {
          openAppSnackbar(this.snackBar, check.message, SNACKBAR_WARNING_STYLE, 2000);
          return;
        }

        /* init nilai untuk preview data */
        this.previewValue = {...this.form.getRawValue()};


        if ((<string> this.previewValue.tanggalPemesanan).trim().length === 0) {
          openAppSnackbar(this.snackBar, 'Tanggal Pemesanan tidak boleh kosong ...', SNACKBAR_WARNING_STYLE, 2000);
          return;
        }

        if ((<string> this.previewValue.nomorDokumenPo).trim().length === 0) {
          openAppSnackbar(this.snackBar, 'Nomor Dokumen tidak ada ...', SNACKBAR_WARNING_STYLE, 2000);
          return;
        }


        /* patch nilai supplier*/
        const idSupplier = <string>(<FormGroup>this.form.controls['supplier']).controls[UUID_COLUMN].value;
        this.supplierLazy.data.filter(value1 => value1.uuid === idSupplier)
          .map((value2: any) => this.previewValue.supplier = {...value2});

        /* patch nilai pelanggan*/
        const idPelanggan = <string>(<FormGroup>this.form.controls['pelanggan']).controls[UUID_COLUMN].value;
        this.pelangganLazy.data.filter(value1 => value1.uuid === idPelanggan)
          .map((value2: any) => this.previewValue.pelanggan = {...value2});
      }

      this.selectedIndex++;
    }
  }

  /* aksi dari tombol kembali*/
  previous() {
    this.selectedIndex--;
  }

  /* callback event untuk pengambilan viewchild dari mat select item per detail, menggunakan bantuan directive*/
  afterItemMasterViewInit(event, i?) {
    if (event instanceof MatSelect) {
      this.itemLazy[i].select = event;
    }
  }


  /* Inisialisasi penambahan data-data detail untuk PO*/
  initializePemesananDetail(fa: FormArray | FormGroup, firstInit = false, initValue?, i?) {

    const detailFormGroup = (firstInit) ? fa
      : pemesananPembelianDetailForm(
        pemesananPembelianDetailInit,
        {
          ...pemesananPembelianDetailDisables, item: {...masterItemDisables, uuid: true}
        });

    const detailLength = (firstInit) ? i : (<FormArray>this.form.controls['detail']).length;

    // init lazy buat item master
    const uuid = (firstInit) ? initValue.item.uuid : undefined;
    this.initItemMasterSelect(detailLength, uuid, (<FormGroup>detailFormGroup));
    this.itemLazy[detailLength]._loadMore((data: MasterItem[]) => {
      if (data) {
        this.dataWarna.push([]); // init nilai data warna  tiap detail item yang akan dipilih
        this.warnaPerItem.push([]); // init
        data.forEach(value => this.createListWarna(value, detailLength));

        if (firstInit) { // jika data baru init awal/ terinit otomatis dari data yang sudah ada
          this.onItemSelectionChange(uuid, i, <FormGroup>fa, firstInit);
        }

      }
    });

    if (!firstInit) {
      this.reactiveFormUtil.addFormArray(<FormGroup>detailFormGroup, fa, true);
    }
  }


  /**
   *
   * @param v uuid yang terpilih dari select di html
   * @param i index detail data
   * @param fgDetail form group detail per index
   */
  onItemSelectionChange(v, i, fgDetail: FormGroup, firstInit = false) {
    if (!firstInit) {
      const uuid = v.value;
      const alreadySelectedItem = [...(<FormArray>this.form.controls['detail']).getRawValue()];
      alreadySelectedItem.splice(i, 1); // hapus array data  yang merupakan data itu sendiri

      /*  Hapus list warna detail jika selection item per detail berubah */
      const detailWarna = (<FormArray>fgDetail.controls['detailWarna']).getRawValue();
      if (detailWarna !== undefined && detailWarna.length > 0) {
        while (this.reactiveFormUtil.getFormArray('detailWarna', fgDetail).length !== 0) {
          this.reactiveFormUtil.removeFormArray(this.reactiveFormUtil.getFormArray('detailWarna', fgDetail), 0);
        }
      }

      /* Jika item yang terpilih di detail selanjutnya sudah ada di daftar liast item terpilih sebelumnya untuk PO yang sama */
      let kain = '';
      if (alreadySelectedItem
        .filter(value => value.item.uuid === uuid).map(value => kain = value.item.namaKain)
        .length > 0) {
        (<FormGroup>fgDetail.controls['item']).patchValue(masterItemInit); // reset reactive form
        this.dataWarna[i] = []; // reset suggestion warna

        if (kain === undefined || kain === null || kain.length === 0) {
        } else {
          openAppSnackbar(this.snackBar,
            'Kain "' + kain + '" sudah ada pada daftar yang terpilih!!!', SNACKBAR_WARNING_STYLE, 1500);
          return;
        }

      }
    }

    /* filter data item berdasarkan item yang terpilih untuk memberikan data warna available pada suggestion box pilih warna */
    this.itemLazy[i].data.filter((value: any) => value.uuid === (firstInit ? v : v.value)).map((value: any) => {
      if (!firstInit) {
        (<FormGroup>fgDetail.controls['item']).patchValue(value);
      }
      this.dataWarna[i] = [...value.warna];
    });


  }

  /* penghapusan salah satu detail dari PO */
  removeDetailPemesananItem(fa, i) {
    this.dataWarna.splice(i, 1);
    this.warnaPerItem.splice(i, 1);
    this.itemLazy.splice(i, 1); // hapus init lazy item
    this.reactiveFormUtil.removeFormArray(fa, i);
  }

  getDetailWarnaValues(fg: FormGroup, arrayControlName: string) {
    return (<FormArray>fg.controls[arrayControlName]).value;
  }

  displayFn(opt?): any | undefined {
    return opt ? opt : undefined;
  }

  editPropertiWarnaChips(fg: FormGroup, i, j) {
    const initValuePropertiWarna = (<FormArray>fg.controls['detailWarna']).getRawValue()[j];
    this.openWarnaPropertiPanel(initValuePropertiWarna, this.reactiveFormUtil.getFormArray('detailWarna', fg), i, false, j);
  }


  /* membuka mini dialog untuk pengisian jumlah dan unit untuk tiap warna yang dipilih dari item tertentu */
  openWarnaPropertiPanel(initValue: any, fa: FormArray, i, action = true, j?) {
    const dialogRef = this.dialog.open(PropertiWarnaPoComponent, {
      width: '400px',
      data: {
        action: action,
        data: initValue,
        disables: {...pemesananPembelianDetailWarnaDisables, unit: true}
      },
      autoFocus: false,
      position: {bottom: '50px', top: '50px'}
    });

    // callback
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (action) { // jika tambah data properti warna yang baru
          this.addNewWarna(fa, result.values);
          this.dataWarnaTrigger[i].closePanel();
        } else {  // jika di ubah
          const existingValue = fa.getRawValue();
          existingValue[j] = result.values;
          fa.patchValue(existingValue);
          openAppSnackbar(this.snackBar,
            'Data Warna "' + result.values.warna.namaWarna + '" OK', SNACKBAR_SUCCESS_STYLE);
        }
      }
    });

  }


  /* digunakan untuk memproses warna yang terpilih dari sebuah sebuah item */
  selected(event: MatAutocompleteSelectedEvent, fa: FormArray, i?): void {
    if (event.option.value !== null) { // jika ada nilainya
      const alreadySelectedWarna = [...(<FormArray>this.form.controls['detail']).getRawValue()[i]['detailWarna']];
      if (alreadySelectedWarna
        .filter(value => value.warna.uuid === event.option.value.uuid)
        .length > 0) {
        openAppSnackbar(this.snackBar,
          'Warna "' + event.option.value.namaWarna + '" ada pada daftar yang terpilih!!', SNACKBAR_WARNING_STYLE, 1500);
        return;
      }
      this.openWarnaPropertiPanel({...pemesananPembelianDetailWarnaInit, warna: {...event.option.value}}, fa, i);
    }
  }

  /* menambahkan warna yang terpilih dari sebuah ite, ke model penampung nilai PO */
  addNewWarna(fa: FormArray, init: PemesananPembelianDetailWarna) {
    this.reactiveFormUtil.addFormArray(pemesananPembelianDetailWarnaForm(init), fa);
  }

  /* menghapus warna yang terpilih pada tiap detail item, dari model penampung nilai-nilai PO */
  removeWarna(fa, i) {
    this.reactiveFormUtil.removeFormArray(fa, i);
    openAppSnackbar(this.snackBar, 'Terhapus', SNACKBAR_ERROR_STYLE, 1000);
  }

  /* menginisialisasi child trigger dari pemilihan warna di setiap item*/
  onWarnaTriggerInitialized(trigger) {
    this.dataWarnaTrigger.push(trigger);
  }


  createListWarna(item, i) {
    if (this.warnaPerItem[i] !== undefined) {
      const warnaItem = new WarnaItem(item, item.warna);
      this.warnaPerItem[i].push(warnaItem);
    }
  }

  poDetailCount() {
    return (<FormArray>this.form.controls['detail']).length;
  }

  poDetailWarnaCheck() {
    const detailFormArray = (<FormArray>this.form.controls['detail']);

    if (detailFormArray.length > 0) {
      for (let i = 0; i < detailFormArray.length; i++) {
        const formGroupDetail = <FormGroup>detailFormArray.controls[i];
        const formArrayDetailWarna = <FormArray>formGroupDetail.controls['detailWarna'];
        if (formArrayDetailWarna.length === 0) {
          return {
            isEmpty: true,
            message: 'Pilihlahan warna pada detail nomor ' + (i + 1) + ' tidak boleh kosong!!'
          };
        }
      }
    }

    return {
      isEmpty: false,
      message: ''
    };
  }

  /**
   * Funsi yang digunakan untuk menyimpan data
   * @param value: data
   */
  save(value?): void {

    // tidak boleh data detail kosong
    if (this.poDetailCount() === 0) {
      openAppSnackbar(this.snackBar, 'Daftar Pemesanan Barang tidak boleh kosong ...', SNACKBAR_WARNING_STYLE, 2000);
      return;
    }

    /* Mengosongkan data approved by and canceled by jika data awal kosong */
    if (value.poApprovedBy.uuid.length === 0) {
      delete value.poApprovedBy;
    }
    if (value.poCancelledBy.uuid.length === 0) {
      delete value.poCancelledBy;
    }


    this.dialogRef.disableClose = true;
    Ui.blockUI('#dialog-block', 0.6, 3, 0, 3);
    setTimeout(() => {
      this.pemesananPembelianService.postData(value).pipe(first()).subscribe(
        value1 => {
          this.dialogRef.disableClose = false;
          Ui.unblockUI('#dialog-block');
          openAppSnackbar(this.snackBar, 'Berhasil ');
          this.dialogRef.close({...this.data, data: SUCCESS});
        },
        error1 => {
          if (error1.status === 401) {
            this.dialogRef.close();
          }
          this.dialogRef.disableClose = false;
          Ui.unblockUI('#dialog-block');
        }
      );
    }, delayHttpRequest);
  }

  /**
   * Funsi untuk melakukan hapus data ke server
   * @param uuid id data
   */
  delete(uuid?): void {
    this.dialogRef.disableClose = true;
    Ui.blockUI('#dialog-block', 0.5, 3, 0, 3);

    setTimeout(() => {
      this.pemesananPembelianService.deleteData(uuid).pipe(first()).subscribe(
        value1 => {
          this.dialogRef.disableClose = false;
          Ui.unblockUI('#dialog-block');
          openAppSnackbar(this.snackBar, 'Berhasil dihapus');
          this.dialogRef.close({...this.data, data: SUCCESS});
        },
        error1 => {
          if (error1.status === 401) {
            this.dialogRef.close();
          }
          this.dialogRef.disableClose = false;
          Ui.unblockUI('#dialog-block');
        }
      );
    }, delayHttpRequest);
  }

  onJenisPemesananClicked(event) {
    this.bottomSheet.open(PemesananPembelianSheetComponent).afterDismissed().subscribe((value: any) => {
      if (value) {

        this.dialogRef.disableClose = true;
        Ui.blockUI('#dialog-block', 0.9, 3, 0, 3);

        setTimeout(() => {
          this.resetDataBlock(value);

          setTimeout(() => {
            /* close dialock block */
            this.dialogRef.disableClose = false;
            Ui.unblockUI('#dialog-block');
          }, 500);

        }, 500);


      } else {  // jika tidak ada pr yang terpilih
        this.jenisPemesanan.setValue(undefined);
      }
    });


    // this.bottomSheet.
  }


  resetDataBlock(value) {
    this.isPemesananPembelianLoaded = false;
    (<FormGroup>this.form.controls['permintaanPembelian']).controls[UUID_COLUMN].patchValue(qualifyObject(value, UUID_COLUMN));

    value = {...value, ...appAuditEntityInit};
    const detail: any[] = value.detail;

    /* Kosongkan dl semua form array detail yang ada */
    while (this.reactiveFormUtil.getFormArray('detail', this.form).length !== 0) {
      this.reactiveFormUtil.removeFormArray(this.reactiveFormUtil.getFormArray('detail', this.form), 0);
    }

    /* Buat ulang form array untuk detail data */
    for (let i = 0; i < detail.length; i++) {
      this.reactiveFormUtil.addFormArray(<FormGroup>pemesananPembelianDetailForm(detail[i]), (<FormArray>this.form.controls['detail']));
    }

    // patch nilai
    this.form.patchValue(value);

    // re-init untuk data salesman
    this.salesmanLazy = new SelectLazy(
      this.form,
      'salesman',
      this.penggunaService.http,
      this.penggunaService.getData,
      value.salesman.uuid, false, {}, 10, 0, this.salesmanLazy.select);


    /* Patching form initializing*/
    this.onPatchingForm(value, true);
  }

  onLangsungClicked() {


    /* Kosongkan dl semua form array detail yang ada */
    while (this.reactiveFormUtil.getFormArray('detail', this.form).length !== 0) {
      this.reactiveFormUtil.removeFormArray(this.reactiveFormUtil.getFormArray('detail', this.form), 0);
    }

    this.form.patchValue(pemesananPembelianInit);
    this.salesmanLazy = new SelectLazy(
      this.form,
      'salesman',
      this.penggunaService.http,
      this.penggunaService.getData,
      '', false, {}, 10, 0, this.salesmanLazy.select);
    this.salesmanLazy._loadMore();

    this.isPemesananPembelianLoaded = false;

  }


  showWarnaDetailError(detailForm: FormGroup, i) {
    return (<FormGroup>(<FormArray>detailForm.controls['detailWarna']).controls[i]).invalid;
  }

  isWarnaDetailError(detailForm: FormGroup) {
    console.log(this.form);
    return (<FormArray>detailForm.controls['detailWarna']).invalid;
  }



}

class WarnaItem {
  constructor(
    public item: MasterItem,
    public warna: MasterWarna[]
  ) {
  }
}

interface DocumentPropertiesParams {

  supplierUuid: string;
  hasCustomer: boolean;

}
