import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DeliveryComponent} from "../../../../components/purchase/delivery/delivery/delivery.component";
import {BhkGuard} from "../../../../services/auth/bhk.guard";


const routes: Routes = [
  {
    path: '',
    component: DeliveryComponent,
    canActivate: [BhkGuard]
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryRoutingModule { }
