import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MasterPelangganComponent} from '../../../../components/master/master-pelanggan/master-pelanggan.component';

const routes: Routes = [
  {
    path: '',
    component: MasterPelangganComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PelangganRoutingModule { }
