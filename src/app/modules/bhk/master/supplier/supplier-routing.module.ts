import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MasterSupplierComponent} from '../../../../components/master/master-supplier/master-supplier.component';

const routes: Routes = [
  {
    path: '',
    component: MasterSupplierComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
