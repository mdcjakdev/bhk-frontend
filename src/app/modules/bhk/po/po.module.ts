import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {PoRoutingModule} from './po-routing.module';
import {PemesananPembelianComponent} from '../../../components/po/pemesanan-pembelian/pemesanan-pembelian.component';
import {PemesananPembelianDialogComponent} from '../../../components/po/pemesanan-pembelian/pemesanan-pembelian-dialog/pemesanan-pembelian-dialog.component';
import {PropertiWarnaPoComponent} from '../../../components/po/pemesanan-pembelian/pemesanan-pembelian-dialog/properti-warna-po/properti-warna-po.component';
import {MasterItemService} from '../../../services/master/master-item/master-item.service';
import {MasterUnitService} from '../../../services/master/master-unit/master-unit.service';
import {PenggunaService} from '../../../services/administrator/pengguna/pengguna.service';
import {PemesananPembelianService} from '../../../services/po/pemesanan-pembelian.service';
import {MasterSupplierService} from '../../../services/master/master-supplier/master-supplier.service';
import {MasterPelangganService} from '../../../services/master/master-pelanggan/master-pelanggan.service';
import {PemesananPembelianSheetComponent} from '../../../components/po/pemesanan-pembelian/pemesanan-pembelian-dialog/pemesanan-pembelian-sheet/pemesanan-pembelian-sheet.component';
import {PermintaanPembelianService} from '../../../services/pr/permintaan-pembelian.service';

@NgModule({
  declarations: [
    PemesananPembelianComponent,
    PemesananPembelianDialogComponent,
    PropertiWarnaPoComponent,
    PemesananPembelianSheetComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PoRoutingModule
  ],
  entryComponents: [
    PemesananPembelianDialogComponent,
    PropertiWarnaPoComponent,
    PemesananPembelianSheetComponent
  ],
  providers: [
    PemesananPembelianService,
    PermintaanPembelianService,
    MasterItemService,
    MasterUnitService,
    PenggunaService,
    MasterSupplierService,
    MasterPelangganService
  ]

})
export class PoModule { }
