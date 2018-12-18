import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {SalesOrderComponent} from './components/sales-order/sales-order.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'masuk',
    component: LoginComponent
  },
  {
    path: 'so',
    component: SalesOrderComponent
  },
  {
    path: 'app',
    // loadChildren: () => BhkModule
    loadChildren: 'src\\app\\modules\\bhk\\bhk.module#BhkModule'
    // component: BhkDashboardComponent
  }
];

@NgModule({
  declarations: [
    // BhkDashboardComponent
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
