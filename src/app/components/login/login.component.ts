import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {BhkService} from "../../services/bhk.service";
import {Router} from "@angular/router";
import {openAppSnackbar, SNACKBAR_WARNING_STYLE} from "../../shared/constants";
import {MatSnackBar} from "@angular/material";
import {Ui} from "../../shared/ui";
import {plantDataToLocalStorage} from "../../shared/utils";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  hide = true;
  isLoginFailed = false;
  startAuth = false;

  failedResponse: any;

  constructor(public auth: AuthService,
              public snackBar: MatSnackBar,
              public bhk: BhkService,
              public router: Router) { }

  ngOnInit() {
  }

  login(info = { username: this.username, password: this.password }) {




    if ((<string> this.username).length === 0) {
      openAppSnackbar(this.snackBar, 'Username tidak boleh kosong ...',
        SNACKBAR_WARNING_STYLE, 500);
      return;
    }


    if ((<string> this.password).length === 0) {
      openAppSnackbar(this.snackBar, 'Password tidak boleh kosong ...',
        SNACKBAR_WARNING_STYLE, 500);
      return;
    }

    Ui.blockUI('#login-card', 0.5, 5, 0, 5);
    this.isLoginFailed = false;
    this.startAuth = true;

   setTimeout(() => {
     this.auth.login(info).pipe().subscribe(
       value => {
         console.log(value)
         this.bhk.addLoginInfo(info);
         this.bhk.addUserInfo(value);
         this.requestToken(info, value);
       },
       error => {
         Ui.unblockUI('#login-card');
         this.startAuth = false;
         this.isLoginFailed = true;
         this.failedResponse = error;
         this.bhk.addLoginInfo(undefined);
         this.bhk.addUserInfo(undefined);
       }
     );
   }, 1000)
  }






  requestToken(loginInfo, userInfo) {

    // JSEN
    this.auth.oauthToken(loginInfo).pipe().subscribe(
      value => {
        console.log(value);
        this.bhk.addOauthInfo(value);
        this.startAuth = false;
        Ui.unblockUI('#login-card');

        plantDataToLocalStorage(loginInfo, userInfo, value);

        this.router.navigate(['/app']);
      },
      error => {
        Ui.unblockUI('#login-card');
        this.startAuth = false;
        this.isLoginFailed = true;
        this.failedResponse = error;
        this.bhk.addLoginInfo(undefined);
        this.bhk.addUserInfo(undefined);
        this.bhk.addOauthInfo(undefined);
      }
    )
  }


}
