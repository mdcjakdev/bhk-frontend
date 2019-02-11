import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PermintaanPembelianComponent} from '../../../../components/purchase/pr/permintaan-pembelian/permintaan-pembelian.component';
import {PermintaanPembelianDialogComponent} from '../../../../components/purchase/pr/permintaan-pembelian/perminataan-pembelian-dialog/perminataan-pembelian-dialog.component';
import {SharedModule} from '../../../shared/shared.module';
import {PrRoutingModule} from './pr-routing.module';
import {PermintaanPembelianService} from '../../../../services/purchase/pr/permintaan-pembelian.service';
import {PenggunaService} from '../../../../services/administrator/pengguna/pengguna.service';
import {MasterItemService} from '../../../../services/master/master-item/master-item.service';
import {PropertiWarnaComponent} from '../../../../components/purchase/pr/permintaan-pembelian/perminataan-pembelian-dialog/properti-warna/properti-warna.component';
import {MasterUnitService} from '../../../../services/master/master-unit/master-unit.service';

@NgModule({
  declarations: [
    PermintaanPembelianComponent,
    PermintaanPembelianDialogComponent,
    PropertiWarnaComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    PrRoutingModule
  ],
  entryComponents: [
    PermintaanPembelianDialogComponent,
    PropertiWarnaComponent
  ],
  providers: [
    PermintaanPembelianService,
    MasterItemService,
    MasterUnitService,
    PenggunaService
  ]
})
export class PrModule { }
