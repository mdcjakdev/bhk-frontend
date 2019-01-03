import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'warna',
    loadChildren: 'src\\app\\modules\\bhk\\master\\warna\\warna.module#WarnaModule'
  },
  {
    path: 'unit',
    loadChildren: 'src\\app\\modules\\bhk\\master\\unit\\unit.module#UnitModule'
  },
  {
    path: 'supplier',
    loadChildren: 'src\\app\\modules\\bhk\\master\\supplier\\supplier.module#SupplierModule'
  },
  {
    path: 'pelanggan',
    loadChildren: 'src\\app\\modules\\bhk\\master\\pelanggan\\pelanggan.module#PelangganModule'
  },
  {
    path: 'lokasi',
    loadChildren: 'src\\app\\modules\\bhk\\master\\lokasi\\lokasi.module#LokasiModule'
  },
  {
    path: 'karyawan',
    loadChildren: 'src\\app\\modules\\bhk\\master\\karyawan\\karyawan.module#KaryawanModule'
  },
  {
    path: 'item',
    loadChildren: 'src\\app\\modules\\bhk\\master\\item\\item.module#ItemModule'
  },
  {
    path: 'gudang',
    loadChildren: 'src\\app\\modules\\bhk\\master\\gudang\\gudang.module#GudangModule'
  },
  {
    path: 'category',
    loadChildren: 'src\\app\\modules\\bhk\\master\\category\\category.module#CategoryModule'
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
