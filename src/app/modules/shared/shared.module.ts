import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  DateAdapter,
  MAT_DIALOG_DATA,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule, MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatOptionModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule, MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {MasterUnitService} from '../../services/master/master-unit/master-unit.service';
import {MasterCategoryService} from '../../services/master/master-category/master-category.service';
import {MasterSupplierService} from '../../services/master/master-supplier/master-supplier.service';
import {MasterPelangganService} from '../../services/master/master-pelanggan/master-pelanggan.service';
import {MasterLokasiService} from '../../services/master/master-lokasi/master-lokasi.service';
import {MasterGudangService} from '../../services/master/master-gudang/master-gudang.service';
import {MasterWarnaService} from '../../services/master/master-warna/master-warna.service';
import {ElementFocusDirective} from '../../shared/directives/element-focus.directive';
import {MasterItemService} from '../../services/master/master-item/master-item.service';
import {MasterKaryawanService} from '../../services/master/master-karyawan/master-karyawan.service';
import {PenggunaService} from '../../services/administrator/pengguna/pengguna.service';
import {PermintaanPembelianService} from '../../services/pr/permintaan-pembelian.service';
import {ServerService} from '../../services/server.service';
import {MiddlewareService} from '../../shared/middleware.service';
import {DashboardSharedService} from '../../services/dashboard-shared.service';
import {AppDateAdapter} from '../../shared/app-date-adapter';


@NgModule({
  declarations: [
    ElementFocusDirective,
  ],
  imports: [
    CommonModule,

    MatDatepickerModule,
    MatNativeDateModule,


    HttpClientModule,

    FormsModule,

    ReactiveFormsModule,

    MatDialogModule,

    NgScrollbarModule,
    // SmoothScrollModule,

    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,

    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatDividerModule,
    MatMenuModule,
    MatNativeDateModule,
    MatListModule,
    MatButtonToggleModule,
    MatCardModule,
    MatTooltipModule,
    MatExpansionModule,

    MatTableModule,
    MatSortModule,
    MatPaginatorModule,

    MatChipsModule,

    MatSnackBarModule,
    MatOptionModule,
    MatSelectModule,

    MatTabsModule

    // Md2DatepickerModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MiddlewareService, multi: true },

    {
      provide: MAT_DIALOG_DATA, // providing untuk data inject ke dialog
      useValue: {} // Add any data you wish to test if it is passed/used correctly
    },
    // { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    { provide: DateAdapter, useClass: AppDateAdapter },


    ServerService


  ],
  entryComponents: [
  ],
  exports: [
    ElementFocusDirective,

    MatDatepickerModule,
    MatNativeDateModule,

    HttpClientModule,

    ReactiveFormsModule,

    FormsModule,

    MatDialogModule,

    NgScrollbarModule,
    // SmoothScrollModule,

    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,

    MatGridListModule,

    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatDividerModule,
    MatMenuModule,
    MatNativeDateModule,
    MatListModule,
    MatButtonToggleModule,
    MatCardModule,
    MatTooltipModule,
    MatExpansionModule,

    MatTableModule,
    MatSortModule,
    MatPaginatorModule,

    MatChipsModule,

    MatSnackBarModule,
    MatOptionModule,
    MatSelectModule,


    MatTabsModule


    // Md2DatepickerModule
  ]
})
export class SharedModule { }
