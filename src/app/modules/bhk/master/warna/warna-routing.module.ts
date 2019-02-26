import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MasterWarnaComponent} from '../../../../components/master/master-warna/master-warna.component';
import {BhkGuard} from "../../../../services/auth/bhk.guard";

const routes: Routes = [
  {
    path: '',
    component: MasterWarnaComponent,
    canActivate: [BhkGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarnaRoutingModule { }
