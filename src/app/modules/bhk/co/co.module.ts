import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PenawaranWarnaComponent} from '../../../components/co/penawaran-warna/penawaran-warna.component';
import {SharedModule} from '../../shared/shared.module';
import {CoRoutingModule} from './co-routing.module';
import {PemesananPembelianService} from '../../../services/po/pemesanan-pembelian.service';
import {PenawaranWarnaService} from '../../../services/co/penawaran-warna.service';
import {PenawaranWarnaSheetComponent} from '../../../components/co/penawaran-warna/penawaran-warna-sheet/penawaran-warna-sheet.component';
import {MasterSupplier} from '../../../inits/master/master-supplier';
import {MasterSupplierService} from '../../../services/master/master-supplier/master-supplier.service';
import {PenawaranWarnaDialogInfoComponent} from '../../../components/co/penawaran-warna/penawaran-warna-dialog-info/penawaran-warna-dialog-info.component';

@NgModule({
  declarations: [
    PenawaranWarnaComponent,
    PenawaranWarnaSheetComponent,
    PenawaranWarnaDialogInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoRoutingModule
  ],
  entryComponents: [
    PenawaranWarnaSheetComponent,
    PenawaranWarnaDialogInfoComponent
  ],
  providers: [
    PemesananPembelianService,
    PenawaranWarnaService,
    MasterSupplierService
  ]
})
export class CoModule { }
