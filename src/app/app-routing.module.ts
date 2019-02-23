import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {SalesOrderComponent} from './components/sales-order/sales-order.component';
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {BhkGuard} from "./services/auth/bhk.guard";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [BhkGuard]
  },
  {
    path: 'masuk',
    component: LoginComponent,
    canActivate: [BhkGuard]
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
  },
  {
    path: '**',
    component: NotFoundComponent
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
