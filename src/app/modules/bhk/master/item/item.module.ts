import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MasterItemComponent} from '../../../../components/master/master-item/master-item.component';
import {MasterItemDialogComponent} from '../../../../components/master/master-item/master-item-dialog/master-item-dialog.component';
import {SharedModule} from '../../../shared/shared.module';
import {ItemRoutingModule} from './item-routing.module';
import {MasterItemService} from '../../../../services/master/master-item/master-item.service';
import {MasterWarnaService} from '../../../../services/master/master-warna/master-warna.service';
import {MasterCategoryService} from '../../../../services/master/master-category/master-category.service';
import {MasterUnitService} from '../../../../services/master/master-unit/master-unit.service';

@NgModule({
  declarations: [
    MasterItemComponent,
    MasterItemDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ItemRoutingModule
  ],
  entryComponents: [
    MasterItemDialogComponent
  ],
  providers: [
    MasterItemService,
    MasterWarnaService,
    MasterCategoryService,
    MasterUnitService
  ]
})
export class ItemModule { }
