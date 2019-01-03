import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BhkDashboardComponent} from '../../components/bhk-dashboard/bhk-dashboard.component';
import {BhkRoutingModule} from './bhk-routing.module';
import {SharedModule} from '../shared/shared.module';
import {DashboardSharedService} from '../../services/dashboard-shared.service';


// import  as moment from 'moment';


export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@NgModule({
  declarations: [
    BhkDashboardComponent
  ],
  imports: [
    CommonModule,
    BhkRoutingModule,
    SharedModule,
    // MatMomentDateModule
  ],
  entryComponents: [
  ],
  exports: [
  ],
  providers: [
    DashboardSharedService
  ]
})
export class BhkModule { }
