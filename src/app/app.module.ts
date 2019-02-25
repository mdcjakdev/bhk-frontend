import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './components/login/login.component';
import {SharedModule} from './modules/shared/shared.module';
import {FormsModule} from '@angular/forms';
import {SalesOrderComponent} from './components/sales-order/sales-order.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {BhkService} from "./services/bhk.service";
import {AuthService} from "./services/auth/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SalesOrderComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,

    SharedModule

  ],
  providers: [
    BhkService
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
