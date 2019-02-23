import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";


@Injectable()
export class BhkService {

  private _loginInfo: Subject<any> = new BehaviorSubject<any>(undefined);

  private _userInfo: Subject<any> = new BehaviorSubject<any>(undefined);

  private _oauthInfo: Subject<any> = new BehaviorSubject<any>(undefined);


  constructor() {
  }

  get loginInfo(): Observable<any> {
    return this._loginInfo.asObservable();
  }

  get userInfo(): Observable<any> {
    return this._userInfo.asObservable();
  }

  get oauthInfo(): Observable<any> {
    return this._oauthInfo.asObservable();
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

