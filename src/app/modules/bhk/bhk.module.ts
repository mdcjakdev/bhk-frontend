import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BhkDashboardComponent} from '../../components/bhk-dashboard/bhk-dashboard.component';
import {BhkRoutingModule} from './bhk-routing.module';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MasterUnitComponent} from '../../components/master/master-unit/master-unit.component';
import {MasterUnitDialogComponent} from '../../components/master/master-unit/master-unit-dialog/master-unit-dialog.component';
import {SharedModule} from '../shared/shared.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {MiddlewareService} from '../../shared/middleware.service';
import {MasterCategoryComponent} from '../../components/master/master-category/master-category.component';
import {MasterCategoryDialogComponent} from '../../components/master/master-category/master-category-dialog/master-category-dialog.component';

@NgModule({
  declarations: [
    BhkDashboardComponent,
    MasterUnitComponent,
    MasterUnitDialogComponent,
    MasterCategoryComponent,
    MasterCategoryDialogComponent
  ],
  imports: [
    CommonModule,

    BhkRoutingModule,
    SharedModule



  ],
  entryComponents: [
    MasterUnitDialogComponent,
    MasterCategoryDialogComponent
  ],
  exports: [
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MiddlewareService, multi: true },

    {
      provide: MAT_DIALOG_DATA, // providing untuk data inject ke dialog
      useValue: {} // Add any data you wish to test if it is passed/used correctly
    }
  ]
})
export class BhkModule { }
