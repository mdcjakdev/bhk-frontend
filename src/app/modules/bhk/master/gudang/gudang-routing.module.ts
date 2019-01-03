import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MasterGudangComponent} from '../../../../components/master/master-gudang/master-gudang.component';

const routes: Routes = [
  {
    path: '',
    component: MasterGudangComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GudangRoutingModule { }
