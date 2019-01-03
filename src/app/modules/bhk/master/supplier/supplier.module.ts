import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MasterSupplierComponent} from '../../../../components/master/master-supplier/master-supplier.component';
import {MasterSupplierDialogComponent} from '../../../../components/master/master-supplier/master-supplier-dialog/master-supplier-dialog.component';
import {SharedModule} from '../../../shared/shared.module';
import {MasterSupplierService} from '../../../../services/master/master-supplier/master-supplier.service';
import {SupplierRoutingModule} from './supplier-routing.module';

@NgModule({
  declarations: [
    MasterSupplierComponent,
    MasterSupplierDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SupplierRoutingModule
  ],
  entryComponents: [
    MasterSupplierDialogComponent
  ],
  providers: [
    MasterSupplierService
  ]
})
export class SupplierModule { }
