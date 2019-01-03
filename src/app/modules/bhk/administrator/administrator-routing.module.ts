import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'pengguna',
    loadChildren: 'src\\app\\modules\\bhk\\administrator\\pengguna\\pengguna.module#PenggunaModule'
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
