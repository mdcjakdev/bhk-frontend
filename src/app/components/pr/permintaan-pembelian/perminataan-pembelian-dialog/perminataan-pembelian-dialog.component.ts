import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, QueryList, ViewChild} from '@angular/core';
import {DialogUtil} from '../../../../shared/dialog-util';
import {
  MAT_DIALOG_DATA,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger, MatDialog,
  MatDialogRef,
  MatSelect,
  MatSnackBar
} from '@angular/material';
import {Ui} from '../../../../shared/ui';
import {first} from 'rxjs/operators';
import {
  delayHttpRequest, invertColor,
  openAppSnackbar,
  SNACKBAR_ERROR_STYLE,
  SNACKBAR_SUCCESS_STYLE,
  SNACKBAR_WARNING_STYLE,
  UUID_COLUMN
} from '../../../../shared/constants';
import {AppErrorStateMatcher, SUCCESS} from '../../../../shared/utils';
import {PermintaanPembelianService} from '../../../../services/pr/permintaan-pembelian.service';
import {
  permintaanPembelianDetailDisables,
  permintaanPembelianDetailForm,
  permintaanPembelianDetailInit,
  PermintaanPembelianDetailWarna, permintaanPembelianDetailWarnaDisables,
  permintaanPembelianDetailWarnaForm,
  permintaanPembelianDetailWarnaInit,
  permintaanPembelianDisables,
  permintaanPembelianErrorStateMatchers,
  permintaanPembelianForm, permintaanPembelianInit
} from '../../../../inits/pr/pr-init';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {SelectLazy} from '../../../../shared/select-lazy';
import {Pengguna} from '../../../../inits/administrator/pengguna-init';
import {PenggunaService} from '../../../../services/administrator/pengguna/pengguna.service';
import {AppHttpGenerate} from '../../../../shared/http-generate';
import {MasterItemService} from '../../../../services/master/master-item/master-item.service';
import {MasterItem, masterItemDisables, masterItemInit} from '../../../../inits/master/master-item';
import {MasterWarna, masterWarnaForm} from '../../../../inits/master/master-warna';
import {Action} from '../../../../shared/action.enum';
import {PropertiWarnaComponent} from './properti-warna/properti-warna.component';


@Component({
  selector: 'app-permintaan-pembelian-dialog',
  templateUrl: './perminataan-pembelian-dialog.component.html',
  styleUrls: ['./perminataan-pembelian-dialog.component.scss']
})
export class PermintaanPembelianDialogComponent extends DialogUtil
  implements OnInit, AfterViewInit {

  invertColor = invertColor;

  close = undefined;

  previewValue = permintaanPembelianInit;

  /** Index dari tab yang terpilih */
  selectedIndex = 0;

  /* Jika index/tab penginputan data permintaan pembelian telah di load(buka) */
  isPermintaanPembelianLoaded = false;


  /** Control validator untuk pemilihan jenis permintaan pembelian */
  jenisPermintaan = new FormControl(undefined, [Validators.required]);
  jenisPermintaanStateMatcher = new AppErrorStateMatcher();
  /**/

  @ViewChild('selectSalesman') selectSalesman;
  salesmanLazy: SelectLazy<Pengguna>;

  itemLazy: SelectLazy<MasterItem>[] = [];

  /* Menampung data warna yang dimiliki tiap item di tiap detail data yang berada pada list dropdown */
  warnaPerItem: any[] = [];

  /* Menampung data warna untul tiap detail */
  dataWarna: any[] = [];

  /*menampung trigger tiap mat complete warna di setiap detail */
  dataWarnaTrigger: MatAutocompleteTrigger[] = [];

  documentProperties: AppHttpGenerate;

  constructor(
    public dialog: MatDialog,
    private changeDetector: ChangeDetectorRef,
    public snackBar: MatSnackBar,
    public penggunaService: PenggunaService,
    public masterItemService: MasterItemService,
    public permintaanPembelianService: PermintaanPembelianService,
    dialogRef: MatDialogRef<PermintaanPembelianDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super(dialogRef,
      data,
      permintaanPembelianForm(data.data, data.disables),
      permintaanPembelianErrorStateMatchers);

    // init untuk data salesman
    this.salesmanLazy = new SelectLazy(
      this.form,
      'salesman',
      penggunaService.http,
      penggunaService.getData,
      data.data.salesman.uuid,
      this.isInsert());

    /** Data awal pr akan diinisialisasi secara otomatis bila aksi adalah proses update data */
    if (this.isUpdate()) {
      this.selectedIndex = 1;
      this.initializing();
      if (data.data.detail) {
        let i = 0;
        for (const detail of data.data.detail) {
          this.initializePermmintaanDetail(
            (<FormGroup>this.reactiveFormUtil.getFormArray('detail', this.form).controls[i]),
            true,
            detail,
            i
          );
          i++;
        }
      }
    }


    /** inisialisasi Generate properti dokumen seperti, nomor dokumen, prefix, counter dan tanggal PR dari server */
    this.documentProperties = new AppHttpGenerate(
      permintaanPembelianService.http,
      permintaanPembelianService.getDocumentProperties
    );
  }


  /* Title dari setiap detail PR*/
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
    if (!this.isPermintaanPembelianLoaded) {

      if (this.isInsert() || this.isUpdate()) {
        this.salesmanLazy._loadMore();
      }

      this.isPermintaanPembelianLoaded = true;
    }

    if (this.isInsert()) {
      /* generate properti dokumen dari server */
      this.generateDocumentProperties();
    }
  }

  ngAfterViewInit(): void {
    this.salesmanLazy.select = this.selectSalesman;
  }

  onTabChanged(index) {
    if (index === 1) { // tab data permintaan pembelian
      setTimeout(() => {
        this.initializing();
      }, 0);
    }
  }

  ngOnInit() {
    /* Subscribe perubahan nilai salesman*/
    (<FormGroup> this.form.controls['salesman']).controls[UUID_COLUMN].valueChanges.subscribe(value => {
      this.salesmanLazy.data.filter(value1 => value1.uuid === value)
        .map(value2 => {
          (<FormGroup> (<FormGroup> this.form.controls['salesman']).controls['karyawan']).patchValue(value2.karyawan)
        });
    });

    // set control jenis permintaan telah di klik
    this.jenisPermintaan.markAsTouched({onlySelf: true});
  }



  /* Menginisialisasi init item detail untuk PR pada dropdown dengan metode lazy load */
  initItemMasterSelect(i, uuid = '', fg = permintaanPembelianDetailForm()) {
    this.itemLazy.push(new SelectLazy(fg,
      'item',
      this.masterItemService.http,
      this.masterItemService.getData,
      uuid,
      (this.isInsert()) ? this.isInsert() : true)
    );
  }

  /* mengambil properti dokumen PR dari server*/
  generateDocumentProperties() {
    if (this.isInsert()) {
      this.form.controls['tanggalPermintaan'].setValue('');
      this.form.controls['nomorDokumenPr'].setValue('');
      this.form.controls['counterPr'].setValue('');
      this.form.controls['nomorPrefixPr'].setValue('');

      this.documentProperties.generate(value => {
        this.form.controls['tanggalPermintaan'].setValue(value['date']);
        this.form.controls['nomorDokumenPr'].setValue(value['nomorDokumen']);
        this.form.controls['counterPr'].setValue(value['counter']);
        this.form.controls['nomorPrefixPr'].setValue(value['prefix']);
      }, error => {

      });
    }
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
      return this.jenisPermintaan.invalid;
    } else if (this.selectedIndex === 1) {
      if (this.isInsert()) {
        return (
          (this.documentProperties.waiting || this.documentProperties.failed) ||
          this.salesmanLazy.failToFetch ||
          this.form.invalid
        );
      } else {
        return (
          (!this.salesmanLazy.isUuidTrue) ||
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
        if (this.prDetailCount() === 0) {
          openAppSnackbar(this.snackBar, 'Daftar Permintaan Barang tidak boleh kosong ...', SNACKBAR_WARNING_STYLE, 2000);
          return;
        }

        // cek apakah ada detail warna yang kosong pada detail permintaan
        const check = this.prDetailWarnaCheck();
        if (check.isEmpty) {
          openAppSnackbar(this.snackBar, check.message, SNACKBAR_WARNING_STYLE, 2000);
          return;
        }

        /* init nilai untuk preview data */
        this.previewValue = {...this.form.getRawValue()};
        // console.log(this.previewValue)
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


  /* Inisialisasi penambahan data-data detail untuk PR*/
  initializePermmintaanDetail(fa: FormArray | FormGroup, firstInit = false, initValue?, i?) {

    const detailFormGroup = (firstInit) ? fa
      : permintaanPembelianDetailForm(
        permintaanPembelianDetailInit,
        {
          ...permintaanPembelianDetailDisables, item: {...masterItemDisables, uuid: true}
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
      this.reactiveFormUtil.addFormArray(<FormGroup>detailFormGroup, fa);
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
      alreadySelectedItem.splice(i, 1) // hapus array data  yang merupakan data itu sendiri

      /* Jika item yang terpilih di detail selanjutnya sudah ada di daftar liast item terpilih sebelumnya untuk PR yang sama */
      let kain = '';
      if (alreadySelectedItem
        .filter(value => value.item.uuid === uuid).map(value => kain = value.item.namaKain)
        .length > 0) {
        (<FormGroup>fgDetail.controls['item']).patchValue(masterItemInit); // reset reactive form
        this.dataWarna[i] = []; // reset suggestion warna

        if (kain === undefined || kain === null || kain.length === 0) {} else {
          openAppSnackbar(this.snackBar,
            'Kain "' + kain + '" sudah ada pada daftar yang terpilih!!!', SNACKBAR_WARNING_STYLE, 1500);
          return;
        }

      }
    }

    /* filter data item berdasarkan item yang terpilih untuk memberikan data warna available pada suggestion box pilih warna */
    this.itemLazy[i].data.filter(value => value.uuid === (firstInit ? v : v.value)).map(value => {
      if (!firstInit) {
        (<FormGroup>fgDetail.controls['item']).patchValue(value);
      }
      this.dataWarna[i] = [...value.warna];
    });

    /*  Hapus list warna detail jika selection item per detail berubah */
    if (!firstInit) {
      const detailWarna = (<FormArray>fgDetail.controls['detailWarna']).getRawValue();
      if (detailWarna !== undefined && detailWarna.length > 0) {
        while (this.reactiveFormUtil.getFormArray('detailWarna', fgDetail).length !== 0) {
          this.reactiveFormUtil.removeFormArray(this.reactiveFormUtil.getFormArray('detailWarna', fgDetail), 0);
        }
      }
    }
  }

  /* penghapusan salah satu detail dari PR */
  removeDetailPermintaanItem(fa, i) {
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
  openWarnaPropertiPanel(initValue: PermintaanPembelianDetailWarna, fa: FormArray, i, action = true, j?) {
    const dialogRef = this.dialog.open(PropertiWarnaComponent, {
      width: '300px',
      data: {
        action: action,
        data: initValue,
        disables: {...permintaanPembelianDetailWarnaDisables, unit: true}
      },
      autoFocus: false,
      position: {bottom: '50px', top: '100px'}
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
      this.openWarnaPropertiPanel({...permintaanPembelianDetailWarnaInit, warna: {...event.option.value}}, fa, i);
    }
  }

  /* menambahkan warna yang terpilih dari sebuah ite, ke model penampung nilai PR */
  addNewWarna(fa: FormArray, init: PermintaanPembelianDetailWarna) {
    this.reactiveFormUtil.addFormArray(permintaanPembelianDetailWarnaForm(init), fa);
  }

  /* menghapus warna yang terpilih pada tiap detail item, dari model penampung nilai-nilai PR */
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

  prDetailCount() {
    return (<FormArray>this.form.controls['detail']).length;
  }

  prDetailWarnaCheck() {
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
      isEmpty: false
    };
  }

  /**
   * Funsi yang digunakan untuk menyimpan data
   * @param value: data
   */
  save(value?): void {

    // tidak boleh data detail kosong
    if (this.prDetailCount() === 0) {
      openAppSnackbar(this.snackBar, 'Daftar Permintaan Barang tidak boleh kosong ...', SNACKBAR_WARNING_STYLE, 2000);
      return;
    }

    /* Mengosongkan data approved by and canceled by jika data awal kosong */
    if (value.prApprovedBy.uuid.length === 0) {
      delete value.prApprovedBy;
    }
    if (value.prCancelledBy.uuid.length === 0) {
      delete value.prCancelledBy;
    }


    this.dialogRef.disableClose = true;
    Ui.blockUI('#dialog-block', 0.6, 4, 0, 4);
    setTimeout(() => {
      this.permintaanPembelianService.postData(value).pipe(first()).subscribe(
        value1 => {
          this.dialogRef.disableClose = false;
          Ui.unblockUI('#dialog-block');
          openAppSnackbar(this.snackBar, 'Berhasil ');
          this.dialogRef.close({...this.data, data: SUCCESS});
        },
        error1 => {
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
    Ui.blockUI('#dialog-block', 0.5, 4, 0, 4);

    setTimeout(() => {
      this.permintaanPembelianService.deleteData(uuid).pipe(first()).subscribe(
        value1 => {
          this.dialogRef.disableClose = false;
          Ui.unblockUI('#dialog-block');
          openAppSnackbar(this.snackBar, 'Berhasil dihapus');
          this.dialogRef.close({...this.data, data: SUCCESS});
        },
        error1 => {
          this.dialogRef.disableClose = false;
          Ui.unblockUI('#dialog-block');
        }
      );
    }, delayHttpRequest);
  }

}

class WarnaItem {
  constructor(
    public item: MasterItem,
    public warna: MasterWarna[]
  ) {
  }
}
