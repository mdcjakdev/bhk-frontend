import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MasterGudangComponent} from '../../../../components/master/master-gudang/master-gudang.component';
import {BhkGuard} from "../../../../services/auth/bhk.guard";

const routes: Routes = [
  {
    path: '',
    component: MasterGudangComponent,
    canActivate: [BhkGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GudangRoutingModule { }
