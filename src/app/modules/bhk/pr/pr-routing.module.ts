import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PermintaanPembelianComponent} from '../../../components/pr/permintaan-pembelian/permintaan-pembelian.component';

const routes: Routes = [
  {
    path: '',
    component: PermintaanPembelianComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrRoutingModule { }
