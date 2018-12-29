import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BhkDashboardComponent} from '../../components/bhk-dashboard/bhk-dashboard.component';
import {BhkRoutingModule} from './bhk-routing.module';
import {DateAdapter, MAT_DIALOG_DATA, MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {MasterUnitComponent} from '../../components/master/master-unit/master-unit.component';
import {MasterUnitDialogComponent} from '../../components/master/master-unit/master-unit-dialog/master-unit-dialog.component';
import {SharedModule} from '../shared/shared.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {MiddlewareService} from '../../shared/middleware.service';
import {MasterCategoryComponent} from '../../components/master/master-category/master-category.component';
import {MasterCategoryDialogComponent} from '../../components/master/master-category/master-category-dialog/master-category-dialog.component';
import {MasterSupplierComponent} from '../../components/master/master-supplier/master-supplier.component';
import {MasterSupplierDialogComponent} from '../../components/master/master-supplier/master-supplier-dialog/master-supplier-dialog.component';
import {AppDateAdapter} from '../../shared/app-date-adapter';
import {MasterGudangDialogComponent} from '../../components/master/master-gudang/master-gudang-dialog/master-gudang-dialog.component';
import {MasterGudangComponent} from '../../components/master/master-gudang/master-gudang.component';
import {MasterItemComponent} from '../../components/master/master-item/master-item.component';
import {MasterItemDialogComponent} from '../../components/master/master-item/master-item-dialog/master-item-dialog.component';
import {MasterKaryawanComponent} from '../../components/master/master-karyawan/master-karyawan.component';
import {MasterKaryawanDialogComponent} from '../../components/master/master-karyawan/master-karyawan-dialog/master-karyawan-dialog.component';
import {MasterPelangganComponent} from '../../components/master/master-pelanggan/master-pelanggan.component';
import {MasterPelangganDialogComponent} from '../../components/master/master-pelanggan/master-pelanggan-dialog/master-pelanggan-dialog.component';
import {MasterLokasiComponent} from '../../components/master/master-lokasi/master-lokasi.component';
import {MasterLokasiDialogComponent} from '../../components/master/master-lokasi/master-lokasi-dialog/master-lokasi-dialog.component';
import {MasterWarnaComponent} from '../../components/master/master-warna/master-warna.component';
import {MasterWarnaDialogComponent} from '../../components/master/master-warna/master-warna-dialog/master-warna-dialog.component';
import {PenggunaComponent} from '../../components/administrator/pengguna/pengguna.component';
import {PenggunaDialogComponent} from '../../components/administrator/pengguna/pengguna-dialog/pengguna-dialog.component';
import {ColorPickerModule} from 'ngx-color-picker';


// import  as moment from 'moment';


export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@NgModule({
  declarations: [
    BhkDashboardComponent,
    MasterUnitComponent,
    MasterUnitDialogComponent,
    MasterCategoryComponent,
    MasterCategoryDialogComponent,
    MasterSupplierComponent,
    MasterSupplierDialogComponent,

    MasterGudangDialogComponent,
    MasterGudangComponent,
    MasterItemComponent,
    MasterItemDialogComponent,
    MasterKaryawanComponent,
    MasterKaryawanDialogComponent,
    MasterPelangganComponent,
    MasterPelangganDialogComponent,
    MasterLokasiComponent,
    MasterLokasiDialogComponent,
    MasterWarnaComponent,
    MasterWarnaDialogComponent,

    PenggunaComponent,
    PenggunaDialogComponent
  ],
  imports: [
    CommonModule,

    BhkRoutingModule,
    SharedModule,
    // MatMomentDateModule
    MatDatepickerModule,
    MatNativeDateModule,

    ColorPickerModule





  ],
  entryComponents: [
    MasterUnitDialogComponent,
    MasterCategoryDialogComponent,
    MasterSupplierDialogComponent,
    MasterGudangDialogComponent,
    MasterItemDialogComponent,
    MasterKaryawanDialogComponent,
    MasterPelangganDialogComponent,
    MasterLokasiDialogComponent,
    MasterWarnaDialogComponent,

    PenggunaDialogComponent
  ],
  exports: [
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MiddlewareService, multi: true },

    {
      provide: MAT_DIALOG_DATA, // providing untuk data inject ke dialog
      useValue: {} // Add any data you wish to test if it is passed/used correctly
    },
    // { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    { provide: DateAdapter, useClass: AppDateAdapter }
  ]
})
export class BhkModule { }
