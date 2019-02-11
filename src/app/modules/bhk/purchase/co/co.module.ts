import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PenawaranWarnaComponent} from '../../../../components/purchase/co/penawaran-warna/penawaran-warna.component';
import {SharedModule} from '../../../shared/shared.module';
import {CoRoutingModule} from './co-routing.module';
import {PemesananPembelianService} from '../../../../services/purchase/po/pemesanan-pembelian.service';
import {PenawaranWarnaService} from '../../../../services/purchase/co/penawaran-warna.service';
import {PenawaranWarnaSheetComponent} from '../../../../components/purchase/co/penawaran-warna/penawaran-warna-sheet/penawaran-warna-sheet.component';
import {MasterSupplierService} from '../../../../services/master/master-supplier/master-supplier.service';
import {PenawaranWarnaDialogInfoComponent} from '../../../../components/purchase/co/penawaran-warna/penawaran-warna-dialog-info/penawaran-warna-dialog-info.component';
import {PenawaranWarnaDialogInfoDetailComponent} from '../../../../components/purchase/co/penawaran-warna/penawaran-warna-dialog-info-detail/penawaran-warna-dialog-info-detail.component';
import {PenawaranWarnaConfirmationDialogComponent} from '../../../../components/purchase/co/penawaran-warna/penawaran-warna-confirmation-dialog/penawaran-warna-confirmation-dialog.component';

@NgModule({
  declarations: [
    PenawaranWarnaComponent,
    PenawaranWarnaSheetComponent,
    PenawaranWarnaDialogInfoComponent,
    PenawaranWarnaDialogInfoDetailComponent,
    PenawaranWarnaConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoRoutingModule
  ],
  entryComponents: [
    PenawaranWarnaSheetComponent,
    PenawaranWarnaDialogInfoComponent,
    PenawaranWarnaDialogInfoDetailComponent,
    PenawaranWarnaConfirmationDialogComponent
  ],
  providers: [
    PemesananPembelianService,
    PenawaranWarnaService,
    MasterSupplierService
  ]
})
export class CoModule { }
