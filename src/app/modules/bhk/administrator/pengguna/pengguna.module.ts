import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PenggunaComponent} from '../../../../components/administrator/pengguna/pengguna.component';
import {PenggunaDialogComponent} from '../../../../components/administrator/pengguna/pengguna-dialog/pengguna-dialog.component';
import {SharedModule} from '../../../shared/shared.module';
import {PenggunaRoutingModule} from './pengguna-routing.module';
import {PenggunaService} from '../../../../services/administrator/pengguna/pengguna.service';
import {MasterKaryawanService} from '../../../../services/master/master-karyawan/master-karyawan.service';

@NgModule({
  declarations: [
    PenggunaComponent,
    PenggunaDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PenggunaRoutingModule
  ],
  entryComponents: [
    PenggunaDialogComponent
  ],
  providers: [
    PenggunaService,
    MasterKaryawanService
  ]
})
export class PenggunaModule { }
