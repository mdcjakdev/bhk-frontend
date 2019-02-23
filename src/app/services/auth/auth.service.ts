import { Injectable } from '@angular/core';
import {convertObjectAsHttpParams} from "../../shared/utils";
import {apiHost, apiPort} from "../../shared/constants";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenParam = 'access_token';

  constructor(public http: HttpClient) { }


  private generateHeaders() {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa('dan:shefvaas')}`
    });

    return {
      headers: httpHeaders,
      withCredentials: false
    };
  }



  public login(info) {
    const api = `${apiHost}:${apiPort}/login/auth`;
    const url = `${api}${convertObjectAsHttpParams(info, api)}`;
    return this.http.post(url, null);
  }


  public oauthToken(info) {
    const api = `${apiHost}:${apiPort}/oauth/token`;
    const url = `${api}${convertObjectAsHttpParams({...info, grant_type: 'password'}, api)}`;
    return this.http.post(url, null, this.generateHeaders());
  }


}
