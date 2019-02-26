import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MasterSupplierComponent} from '../../../../components/master/master-supplier/master-supplier.component';
import {BhkGuard} from "../../../../services/auth/bhk.guard";

const routes: Routes = [
  {
    path: '',
    component: MasterSupplierComponent,
    canActivate: [BhkGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
