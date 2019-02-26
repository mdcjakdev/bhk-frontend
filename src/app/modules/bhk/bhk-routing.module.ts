import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BhkDashboardComponent} from '../../components/bhk-dashboard/bhk-dashboard.component';
import {BhkGuard} from "../../services/auth/bhk.guard";

const routes: Routes = [
  {
    path: '',
    component: BhkDashboardComponent,
    canActivate: [BhkGuard],
    children: [
      {
        path: 'master',
        loadChildren: 'src\\app\\modules\\bhk\\master\\master.module#MasterModule'
      },
      {
        path: 'administrator',
        loadChildren: 'src\\app\\modules\\bhk\\administrator\\administrator.module#AdministratorModule'
      },
      {
        path: 'pembelian/pr',
        loadChildren: 'src\\app\\modules\\bhk\\purchase\\pr\\pr.module#PrModule'
      },
      {
        path: 'pembelian/po',
        loadChildren: 'src\\app\\modules\\bhk\\purchase\\po\\po.module#PoModule'
      },
      {
        path: 'pembelian/co',
        loadChildren: 'src\\app\\modules\\bhk\\purchase\\co\\co.module#CoModule'
      },
      {
        path: 'pembelian/delivery',
        loadChildren: 'src\\app\\modules\\bhk\\purchase\\delivery\\delivery.module#DeliveryModule'
      }
    ]
  }
]


@NgModule({
  declarations: [
    // BhkDashboardComponent
  ],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BhkRoutingModule { }
