import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MasterCategoryComponent} from '../../../../components/master/master-category/master-category.component';

const routes: Routes = [
  {
    path: '',
    component: MasterCategoryComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
