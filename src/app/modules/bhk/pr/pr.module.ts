import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PermintaanPembelianComponent} from '../../../components/pr/permintaan-pembelian/permintaan-pembelian.component';
import {PermintaanPembelianDialogComponent} from '../../../components/pr/permintaan-pembelian/perminataan-pembelian-dialog/perminataan-pembelian-dialog.component';
import {SharedModule} from '../../shared/shared.module';
import {PrRoutingModule} from './pr-routing.module';
import {PermintaanPembelianService} from '../../../services/pr/permintaan-pembelian.service';
import {PenggunaService} from '../../../services/administrator/pengguna/pengguna.service';

@NgModule({
  declarations: [
    PermintaanPembelianComponent,
    PermintaanPembelianDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PrRoutingModule
  ],
  entryComponents: [
    PermintaanPembelianDialogComponent
  ],
  providers: [
    PermintaanPembelianService,
    PenggunaService
  ]
})
export class PrModule { }
