import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WarnaRoutingModule} from './warna-routing.module';
import {MasterWarnaComponent} from '../../../../components/master/master-warna/master-warna.component';
import {MasterWarnaDialogComponent} from '../../../../components/master/master-warna/master-warna-dialog/master-warna-dialog.component';
import {SharedModule} from '../../../shared/shared.module';
import {ColorPickerModule} from 'ngx-color-picker';
import {MasterWarnaService} from '../../../../services/master/master-warna/master-warna.service';

@NgModule({
  declarations: [
    MasterWarnaComponent,
    MasterWarnaDialogComponent,
  ],
  imports: [
    CommonModule,
    WarnaRoutingModule,
    ColorPickerModule,
    SharedModule
  ],
  entryComponents: [
    MasterWarnaDialogComponent,
  ],
  providers: [
    MasterWarnaService
  ]
})
export class WarnaModule { }
