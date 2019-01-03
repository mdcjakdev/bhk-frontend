import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MasterLokasiComponent} from '../../../../components/master/master-lokasi/master-lokasi.component';
import {MasterLokasiDialogComponent} from '../../../../components/master/master-lokasi/master-lokasi-dialog/master-lokasi-dialog.component';
import {SharedModule} from '../../../shared/shared.module';
import {LokasiRoutingModule} from './lokasi-routing.module';
import {MasterLokasiService} from '../../../../services/master/master-lokasi/master-lokasi.service';

@NgModule({
  declarations: [
    MasterLokasiComponent,
    MasterLokasiDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    LokasiRoutingModule
  ],
  entryComponents: [
    MasterLokasiDialogComponent
  ],
  providers: [
    MasterLokasiService
  ]
})
export class LokasiModule { }
