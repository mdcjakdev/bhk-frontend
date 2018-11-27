import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BhkDashboardComponent} from '../../components/bhk-dashboard/bhk-dashboard.component';
import {BhkRoutingModule} from './bhk-routing.module';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule, MatChipsModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {MasterUnitComponent} from '../../components/master/master-unit/master-unit.component';
import {BlockUIModule} from 'ng-block-ui';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    BhkDashboardComponent,
    MasterUnitComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BhkRoutingModule,

    BlockUIModule.forRoot(),


    MatInputModule,
    MatFormFieldModule,

    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatDividerModule,
    MatMenuModule,
    MatNativeDateModule,
    MatListModule,
    MatButtonToggleModule,
    MatCardModule,
    MatTooltipModule,
    MatExpansionModule,

    MatTableModule,
    MatSortModule,
    MatPaginatorModule,

    MatChipsModule

  ],
  exports: [
  ]
})
export class BhkModule { }
