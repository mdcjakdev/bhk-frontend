import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PemesananPembelianComponent} from '../../../components/po/pemesanan-pembelian/pemesanan-pembelian.component';

const routes: Routes = [
  {
    path: '',
    component: PemesananPembelianComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoRoutingModule { }
