import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PenggunaComponent} from '../../../../components/administrator/pengguna/pengguna.component';

const routes: Routes = [
  {
    path: '',
    component: PenggunaComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PenggunaRoutingModule { }
