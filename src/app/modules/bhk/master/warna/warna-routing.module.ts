import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MasterWarnaComponent} from '../../../../components/master/master-warna/master-warna.component';

const routes: Routes = [
  {
    path: '',
    component: MasterWarnaComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarnaRoutingModule { }
