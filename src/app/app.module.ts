import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './components/login/login.component';
import {SharedModule} from './modules/shared/shared.module';
import {FormsModule} from '@angular/forms';
import {SalesOrderComponent} from './components/sales-order/sales-order.component';
import { ElementFocusDirective } from './shared/directives/element-focus.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SalesOrderComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,

    SharedModule

  ],
  providers: [

  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
