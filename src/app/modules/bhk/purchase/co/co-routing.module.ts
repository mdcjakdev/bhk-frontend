import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PenawaranWarnaComponent} from '../../../../components/purchase/co/penawaran-warna/penawaran-warna.component';
import {BhkGuard} from "../../../../services/auth/bhk.guard";

const routes: Routes = [
  {
    path: '',
    component: PenawaranWarnaComponent,
    canActivate: [BhkGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoRoutingModule { }
