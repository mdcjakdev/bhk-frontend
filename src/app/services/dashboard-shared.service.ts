import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable()
export class DashboardSharedService {

  /* untuk mengetahui perubahan nilai dari nilai pixel yang di scroll user */
  private _scrolledByUser: Subject<number> = new BehaviorSubject<number>(0);

  /* untuk sharing apakah, sidenav bar ada atau hidden */
  private _sideNav: Subject<any> = new BehaviorSubject<any>(undefined);

  /* Loading bar indicator */
  private _loadingBarIndicator: Subject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() { }


  get loadingBarIndicator(): Observable<boolean> {
    return this._loadingBarIndicator.asObservable();
  }


  get scrolledByUser(): Observable<number> {
    return this._scrolledByUser.asObservable();
  }

  get sideNav(): Observable<any> {
    return this._sideNav.asObservable();
  }

  public addLoadingBarIndicator(value) {
    return this._loadingBarIndicator.next(value);
  }

  public addScrolledByUser(value) {
    return this._scrolledByUser.next(value);
  }

  public addSideNav(value) {
    return this._sideNav.next(value);
  }

}
