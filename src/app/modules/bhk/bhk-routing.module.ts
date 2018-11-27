import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BhkDashboardComponent} from '../../components/bhk-dashboard/bhk-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: BhkDashboardComponent
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
