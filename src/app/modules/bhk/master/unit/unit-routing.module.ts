import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MasterUnitComponent} from '../../../../components/master/master-unit/master-unit.component';
import {BhkGuard} from "../../../../services/auth/bhk.guard";

const routes: Routes = [
  {
    path: '',
    component: MasterUnitComponent,
    canActivate: [BhkGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitRoutingModule { }
