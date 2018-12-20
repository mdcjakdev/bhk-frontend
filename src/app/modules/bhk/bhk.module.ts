import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BhkDashboardComponent} from '../../components/bhk-dashboard/bhk-dashboard.component';
import {BhkRoutingModule} from './bhk-routing.module';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {MasterUnitComponent} from '../../components/master/master-unit/master-unit.component';
import {MasterUnitDialogComponent} from '../../components/master/master-unit/master-unit-dialog/master-unit-dialog.component';
import {SharedModule} from '../shared/shared.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {MiddlewareService} from '../../shared/middleware.service';
import {MasterCategoryComponent} from '../../components/master/master-category/master-category.component';
import {MasterCategoryDialogComponent} from '../../components/master/master-category/master-category-dialog/master-category-dialog.component';
import {MasterSupplierComponent} from '../../components/master/master-supplier/master-supplier.component';
import {MasterSupplierDialogComponent} from '../../components/master/master-supplier/master-supplier-dialog/master-supplier-dialog.component';
import {MatMomentDateModule, MomentDateAdapter} from '@angular/material-moment-adapter';
import {AppDateAdapter} from '../../shared/app-date-adapter';

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


// const CUSTOM_DATE_FORMATS = {
//   parse: {
//     dateInput: { month: "short", year: "numeric", day: "numeric" }
//   },
//   display: {
//     dateInput: "input",
//     monthYearLabel: { year: "numeric", month: "short" },
//     dateA11yLabel: { year: "numeric", month: "long", day: "numeric" },
//     monthYearA11yLabel: { year: "numeric", month: "long" }
//   }
// };

@NgModule({
  declarations: [
    BhkDashboardComponent,
    MasterUnitComponent,
    MasterUnitDialogComponent,
    MasterCategoryComponent,
    MasterCategoryDialogComponent,
    MasterSupplierComponent,
    MasterSupplierDialogComponent
  ],
  imports: [
    CommonModule,

    BhkRoutingModule,
    SharedModule,
    // MatNativeDateModule,  ,,,
    // MatMomentDateModule
    MatDatepickerModule,
    MatNativeDateModule





  ],
  entryComponents: [
    MasterUnitDialogComponent,
    MasterCategoryDialogComponent,
    MasterSupplierDialogComponent
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
