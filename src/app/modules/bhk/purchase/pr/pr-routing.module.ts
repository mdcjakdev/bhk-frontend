import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PermintaanPembelianComponent} from '../../../../components/purchase/pr/permintaan-pembelian/permintaan-pembelian.component';
import {BhkGuard} from "../../../../services/auth/bhk.guard";

const routes: Routes = [
  {
    path: '',
    component: PermintaanPembelianComponent,
    canActivate: [BhkGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrRoutingModule { }
