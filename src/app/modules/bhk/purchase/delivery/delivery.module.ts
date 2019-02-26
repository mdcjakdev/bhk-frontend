import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../../shared/shared.module";
import {DeliveryRoutingModule} from "./delivery-routing.module";
import {PemesananPembelianService} from "../../../../services/purchase/po/pemesanan-pembelian.service";
import {DeliveryService} from "../../../../services/purchase/delivery/delivery.service";
import {MasterLokasiService} from "../../../../services/master/master-lokasi/master-lokasi.service";
import {DeliveryComponent} from "../../../../components/purchase/delivery/delivery/delivery.component";
import {DeliverySheetComponent} from "../../../../components/purchase/delivery/delivery/delivery-sheet/delivery-sheet.component";
import {DeliveryDialogWarnaComponent} from "../../../../components/purchase/delivery/delivery/delivery-dialog-warna/delivery-dialog-warna.component";
import {DeliveryDialogWarnaInfoComponent} from "../../../../components/purchase/delivery/delivery/delivery-dialog-warna-info/delivery-dialog-warna-info.component";
import {DeliveryConfirmationDialogComponent} from "../../../../components/purchase/delivery/delivery/delivery-confirmation-dialog/delivery-confirmation-dialog.component";

@NgModule({
  declarations: [
    DeliveryComponent,
    DeliverySheetComponent,
    DeliveryDialogWarnaComponent,
    DeliveryDialogWarnaInfoComponent,
    DeliveryConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DeliveryRoutingModule
  ],
  entryComponents: [
    DeliverySheetComponent,
    DeliveryDialogWarnaComponent,
    DeliveryDialogWarnaInfoComponent,
    DeliveryConfirmationDialogComponent
  ],
  providers: [
    PemesananPembelianService,
    DeliveryService,
    MasterLokasiService
  ]
})
export class DeliveryModule { }
