import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MasterKaryawanComponent} from '../../../../components/master/master-karyawan/master-karyawan.component';
import {BhkGuard} from "../../../../services/auth/bhk.guard";

const routes: Routes = [
  {
    path: '',
    component: MasterKaryawanComponent,
    canActivate: [BhkGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KaryawanRoutingModule { }
