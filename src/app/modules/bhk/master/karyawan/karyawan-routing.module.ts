import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MasterKaryawanComponent} from '../../../../components/master/master-karyawan/master-karyawan.component';

const routes: Routes = [
  {
    path: '',
    component: MasterKaryawanComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KaryawanRoutingModule { }
