import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";


@Injectable()
export class BhkService {

  private _redirect: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  private _loginInfo: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  private _userInfo: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  private _oauthInfo: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);


  constructor() {
  }

  get redirect(): BehaviorSubject<any> {
    return this._redirect;
  }

  get loginInfo(): BehaviorSubject<any> {
    return this._loginInfo;
  }

  get userInfo(): BehaviorSubject<any> {
    return this._userInfo;
  }

  get oauthInfo(): BehaviorSubject<any> {
    return this._oauthInfo;
  }


  public redirectTo(value) {
    this._redirect.next(value);
  }

  public addOauthInfo(value) {
    this._oauthInfo.next(value);
  }

  public addUserInfo(value) {
    this._userInfo.next(value);
  }

  public addLoginInfo(value) {
    this._loginInfo.next(value);
  }



}

