import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PemesananPembelianComponent} from '../../../../components/purchase/po/pemesanan-pembelian/pemesanan-pembelian.component';
import {BhkGuard} from "../../../../services/auth/bhk.guard";

const routes: Routes = [
  {
    path: '',
    component: PemesananPembelianComponent,
    canActivate: [BhkGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoRoutingModule { }
