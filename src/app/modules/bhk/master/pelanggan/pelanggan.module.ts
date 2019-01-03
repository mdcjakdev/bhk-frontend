import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MasterPelangganComponent} from '../../../../components/master/master-pelanggan/master-pelanggan.component';
import {MasterPelangganDialogComponent} from '../../../../components/master/master-pelanggan/master-pelanggan-dialog/master-pelanggan-dialog.component';
import {SharedModule} from '../../../shared/shared.module';
import {PelangganRoutingModule} from './pelanggan-routing.module';
import {MasterPelangganService} from '../../../../services/master/master-pelanggan/master-pelanggan.service';

@NgModule({
  declarations: [
    MasterPelangganComponent,
    MasterPelangganDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PelangganRoutingModule
  ],
  entryComponents: [
    MasterPelangganDialogComponent
  ],
  providers: [
    MasterPelangganService
  ]
})
export class PelangganModule { }
