import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule, MatButtonToggleModule, MatCardModule, MatChipsModule,
  MatDialogModule, MatDividerModule, MatExpansionModule,
  MatFormFieldModule, MatGridListModule,
  MatIconModule,
  MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule, MatSidenavModule, MatSnackBarModule, MatSortModule, MatTableModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {MasterUnitService} from '../../services/master/master-unit/master-unit.service';
import {MasterCategoryService} from '../../services/master/master-category/master-category.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,

    ReactiveFormsModule,

    MatDialogModule,

    NgScrollbarModule,
    // SmoothScrollModule,

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

    MatChipsModule,

    MatSnackBarModule
  ],
  providers: [
    MasterUnitService,
    MasterCategoryService
  ], exports: [
    HttpClientModule,

    ReactiveFormsModule,

    MatDialogModule,

    NgScrollbarModule,
    // SmoothScrollModule,

    MatInputModule,
    MatFormFieldModule,

    MatGridListModule,

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

    MatChipsModule,

    MatSnackBarModule
  ]
})
export class SharedModule { }
