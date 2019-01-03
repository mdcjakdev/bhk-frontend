import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MasterGudangDialogComponent} from '../../../../components/master/master-gudang/master-gudang-dialog/master-gudang-dialog.component';
import {MasterGudangComponent} from '../../../../components/master/master-gudang/master-gudang.component';
import {GudangRoutingModule} from './gudang-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {MasterGudangService} from '../../../../services/master/master-gudang/master-gudang.service';
import {MasterLokasiService} from '../../../../services/master/master-lokasi/master-lokasi.service';

@NgModule({
  declarations: [
    MasterGudangDialogComponent,
    MasterGudangComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    GudangRoutingModule,
  ],
  entryComponents: [
    MasterGudangDialogComponent
  ],
  providers: [
    MasterGudangService,
    MasterLokasiService
  ]
})
export class GudangModule { }
