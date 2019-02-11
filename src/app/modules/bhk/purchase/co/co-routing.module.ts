import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PenawaranWarnaComponent} from '../../../../components/purchase/co/penawaran-warna/penawaran-warna.component';

const routes: Routes = [
  {
    path: '',
    component: PenawaranWarnaComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoRoutingModule { }
