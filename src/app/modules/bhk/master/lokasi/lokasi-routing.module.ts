import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MasterLokasiComponent} from '../../../../components/master/master-lokasi/master-lokasi.component';
import {BhkGuard} from "../../../../services/auth/bhk.guard";

const routes: Routes = [
  {
    path: '',
    component: MasterLokasiComponent,
    canActivate: [BhkGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LokasiRoutingModule { }
