import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MasterLokasiComponent} from '../../../../components/master/master-lokasi/master-lokasi.component';

const routes: Routes = [
  {
    path: '',
    component: MasterLokasiComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LokasiRoutingModule { }
