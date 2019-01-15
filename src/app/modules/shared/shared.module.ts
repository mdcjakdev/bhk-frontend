import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  DateAdapter,
  MAT_DIALOG_DATA,
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatOptionModule,
  MatPaginatorIntl,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {ElementFocusDirective} from '../../shared/directives/element-focus.directive';
import {ServerService} from '../../services/server.service';
import {MiddlewareService} from '../../shared/middleware.service';
import {AppDateAdapter} from '../../shared/app-date-adapter';
import {TextMaskModule} from 'angular2-text-mask';
import {AppMatPaginatorIntl} from '../../shared/app-mat-paginator-intl';
import {MatAutocompleteTriggerViewChildDirective} from '../../shared/directives/mat-autocomplete-trigger-view-child.directive';
import {MatSelectViewChildDirective} from '../../shared/directives/mat-select-view-child.directive';
import {MatTooltipAsNotificationDirective} from '../../shared/directives/mat-tooltip-as-notification.directive';


@NgModule({
  declarations: [
    ElementFocusDirective,
    MatSelectViewChildDirective,
    MatTooltipAsNotificationDirective,
    MatAutocompleteTriggerViewChildDirective
  ],
  imports: [
    CommonModule,

    MatDatepickerModule,
    MatNativeDateModule,


    HttpClientModule,

    FormsModule,

    ReactiveFormsModule,

    MatDialogModule,

    NgScrollbarModule,
    // SmoothScrollModule,

    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,

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

    MatSnackBarModule,
    MatOptionModule,
    MatSelectModule,

    MatCheckboxModule,

    MatTabsModule,

    TextMaskModule,
    MatBottomSheetModule,
    MatBadgeModule


    // Md2DatepickerModule

  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: AppMatPaginatorIntl},
    { provide: HTTP_INTERCEPTORS, useClass: MiddlewareService, multi: true },

    {
      provide: MAT_DIALOG_DATA, // providing untuk data inject ke dialog
      useValue: {} // Add any data you wish to test if it is passed/used correctly
    },
    // { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    { provide: DateAdapter, useClass: AppDateAdapter },


    ServerService


  ],
  entryComponents: [
  ],
  exports: [
    ElementFocusDirective,
    MatSelectViewChildDirective,
    MatTooltipAsNotificationDirective,
    MatAutocompleteTriggerViewChildDirective,


    MatDatepickerModule,
    MatNativeDateModule,

    HttpClientModule,

    ReactiveFormsModule,

    FormsModule,

    MatDialogModule,

    NgScrollbarModule,
    // SmoothScrollModule,

    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,

    MatGridListModule,

    MatCheckboxModule,

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

    MatSnackBarModule,
    MatOptionModule,
    MatSelectModule,


    MatTabsModule,

    TextMaskModule,

    MatBottomSheetModule,
    MatBadgeModule


    // Md2DatepickerModule
  ]
})
export class SharedModule { }
