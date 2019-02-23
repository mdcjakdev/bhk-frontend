import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {decrypt, LOGIN, OAUTH, plantDataToLocalStorage, USER} from "../../shared/utils";
import {BhkService} from "../bhk.service";

@Injectable({
  providedIn: 'root'
})
export class BhkGuard implements CanActivate, CanActivateChild {


  constructor(public bhk: BhkService, public router: Router) {
  }

  canActivate(
    parentRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.activatingGuard(parentRoute, state);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.activatingGuard(childRoute, state);
  }


  activatingGuard(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const oauthData = localStorage.getItem(OAUTH);

    if (state.url === '/' || state.url === '/masuk') {
      if (oauthData) {
        this.reactivatingLogin(oauthData);
        this.router.navigate(['/app'])
      }
      return true;
    } else {
      if (oauthData) {
        this.reactivatingLogin(oauthData);
        return true;
      } else {
        this.router.navigate(['/denied']);
        return false;
      }
    }

    return true;
  }


  reactivatingLogin(oauthData) {
    const login = JSON.parse(decrypt(localStorage.getItem(LOGIN)));
    const user = JSON.parse(decrypt(localStorage.getItem(USER)));
    const oauth = JSON.parse(decrypt(oauthData));
    this.bhk.addLoginInfo(login);
    this.bhk.addUserInfo(user);
    this.bhk.addOauthInfo(oauth);
  }


}
