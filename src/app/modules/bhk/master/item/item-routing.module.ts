import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MasterItemComponent} from '../../../../components/master/master-item/master-item.component';
import {BhkGuard} from "../../../../services/auth/bhk.guard";

const routes: Routes = [
  {
    path: '',
    component: MasterItemComponent,
    canActivate: [BhkGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
