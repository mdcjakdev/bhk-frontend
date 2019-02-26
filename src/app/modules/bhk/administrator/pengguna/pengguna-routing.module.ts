import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PenggunaComponent} from '../../../../components/administrator/pengguna/pengguna.component';
import {BhkGuard} from "../../../../services/auth/bhk.guard";

const routes: Routes = [
  {
    path: '',
    component: PenggunaComponent,
    canActivate: [BhkGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PenggunaRoutingModule { }
