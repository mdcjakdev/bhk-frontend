import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MasterKaryawanComponent} from '../../../../components/master/master-karyawan/master-karyawan.component';
import {MasterKaryawanDialogComponent} from '../../../../components/master/master-karyawan/master-karyawan-dialog/master-karyawan-dialog.component';
import {SharedModule} from '../../../shared/shared.module';
import {KaryawanRoutingModule} from './karyawan-routing.module';
import {MasterKaryawanService} from '../../../../services/master/master-karyawan/master-karyawan.service';

@NgModule({
  declarations: [
    MasterKaryawanComponent,
    MasterKaryawanDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    KaryawanRoutingModule
  ],
  entryComponents: [
    MasterKaryawanDialogComponent
  ],
  providers: [
    MasterKaryawanService
  ]
})
export class KaryawanModule { }
