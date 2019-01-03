import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MasterUnitComponent} from '../../../../components/master/master-unit/master-unit.component';
import {MasterUnitDialogComponent} from '../../../../components/master/master-unit/master-unit-dialog/master-unit-dialog.component';
import {SharedModule} from '../../../shared/shared.module';
import {UnitRoutingModule} from './unit-routing.module';
import {MasterUnitService} from '../../../../services/master/master-unit/master-unit.service';

@NgModule({
  declarations: [
    MasterUnitComponent,
    MasterUnitDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UnitRoutingModule
  ],
  entryComponents: [
    MasterUnitDialogComponent,
  ],
  providers: [
    MasterUnitService
  ]
})
export class UnitModule { }
