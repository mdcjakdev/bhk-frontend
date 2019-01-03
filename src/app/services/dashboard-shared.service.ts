import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable()
export class DashboardSharedService {

  /* untuk mengetahui perubahan nilai dari nilai pixel yang di scroll user */
  private _scrolledByUser: Subject<number> = new BehaviorSubject<number>(0);

  /* untuk sharing apakah, sidenav bar ada atau hidden */
  private _sideNav: Subject<any> = new BehaviorSubject<any>(undefined);

  constructor() { }


  get scrolledByUser(): Observable<number> {
    return this._scrolledByUser.asObservable();
  }

  get sideNav(): Observable<any> {
    return this._sideNav.asObservable();
  }


  public addScrolledByUser(value) {
    return this._scrolledByUser.next(value);
  }

  public addSideNav(value) {
    return this._sideNav.next(value);
  }

}
