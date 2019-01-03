import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MasterCategoryComponent} from '../../../../components/master/master-category/master-category.component';
import {MasterCategoryDialogComponent} from '../../../../components/master/master-category/master-category-dialog/master-category-dialog.component';
import {SharedModule} from '../../../shared/shared.module';
import {CategoryRoutingModule} from './category-routing.module';
import {MasterCategoryService} from '../../../../services/master/master-category/master-category.service';

@NgModule({
  declarations: [
    MasterCategoryComponent,
    MasterCategoryDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CategoryRoutingModule
  ],
  entryComponents: [
    MasterCategoryDialogComponent
  ],
  providers: [
    MasterCategoryService
  ]
})
export class CategoryModule { }
