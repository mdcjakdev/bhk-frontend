import { Injectable } from '@angular/core';
import {toParams} from "../../shared/utils";
import {apiHost, apiPort} from "../../shared/constants";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class AuthService {

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
    const url = `${api}${toParams(info, api)}`;
    return this.http.post(url, null);
  }


  public oauthToken(info) {
    const api = `${apiHost}:${apiPort}/oauth/token`;
    const url = `${api}${toParams({...info, grant_type: 'password'}, api)}`;
    return this.http.post(url, null, this.generateHeaders());
  }


}
