import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MasterPelangganComponent} from '../../../../components/master/master-pelanggan/master-pelanggan.component';
import {BhkGuard} from "../../../../services/auth/bhk.guard";

const routes: Routes = [
  {
    path: '',
    component: MasterPelangganComponent,
    canActivate: [BhkGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PelangganRoutingModule { }
