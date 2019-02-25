import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {openAppSnackbar, SNACKBAR_ERROR_STYLE} from './constants';
import {CANNOT_PROCESS, ERROR_STATUS_CODE_0} from './system-error-messages';
import {LOGIN, OAUTH, USER} from "./utils";
import {Router} from "@angular/router";
import {BhkService} from "../services/bhk.service";

@Injectable()
export class MiddlewareService implements HttpInterceptor {

  constructor(public snackBar: MatSnackBar, public router: Router, private bhk: BhkService) { }


  removeAuthenticationInfo() {
    this.bhk.addUserInfo(undefined);
    this.bhk.addLoginInfo(undefined);
    this.bhk.addOauthInfo(undefined);
    localStorage.removeItem(LOGIN);
    localStorage.removeItem(USER);
    localStorage.removeItem(OAUTH);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(
        error => {
          console.log(error);

          if (error.status === 0) {
            openAppSnackbar(this.snackBar, ERROR_STATUS_CODE_0, SNACKBAR_ERROR_STYLE, 2000);
          } else {
            if (error.status === 401) {
              setTimeout(() => {
                openAppSnackbar(this.snackBar, 'Session anda telah habis. Silahkan Login Ulang',
                  SNACKBAR_ERROR_STYLE, 2000);
              }, 100);
              // this.removeAuthenticationInfo();
              // this.router.navigate(['/']);
            } else if (error.status === 500) {
              if (error.error.message === undefined) {
                openAppSnackbar(this.snackBar, CANNOT_PROCESS, SNACKBAR_ERROR_STYLE, 2000);
              } else {
                openAppSnackbar(this.snackBar, error.error.message, SNACKBAR_ERROR_STYLE, 2000);
              }
            } else {
              openAppSnackbar(this.snackBar, error.error.message, SNACKBAR_ERROR_STYLE, 2000);
            }
          }
          return throwError(error);
        }
      )
    );
  }


}
