import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
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
  MatTableModule,
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


@NgModule({
  declarations: [
    ElementFocusDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule,

    ReactiveFormsModule,

    MatDialogModule,

    NgScrollbarModule,
    // SmoothScrollModule,

    MatInputModule,
    MatFormFieldModule,

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
    MatSelectModule

    // Md2DatepickerModule

  ],
  providers: [
    MasterUnitService,
    MasterCategoryService,
    MasterSupplierService,
    MasterPelangganService,
    MasterLokasiService,
    MasterGudangService,
    MasterWarnaService,
    MasterItemService,
    MasterKaryawanService


  ],
  exports: [
    ElementFocusDirective,
    HttpClientModule,

    ReactiveFormsModule,

    MatDialogModule,

    NgScrollbarModule,
    // SmoothScrollModule,

    MatInputModule,
    MatFormFieldModule,

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


    // Md2DatepickerModule
  ]
})
export class SharedModule { }
