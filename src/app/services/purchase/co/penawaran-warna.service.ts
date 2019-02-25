import { Injectable } from '@angular/core';
import {apiHost, apiPort, server, TOKEN} from '../../../shared/constants';
import {toParams} from '../../../shared/utils';
import {HttpClient} from '@angular/common/http';
import {BhkService} from "../../bhk.service";

@Injectable()
export class PenawaranWarnaService {

  constructor(public http: HttpClient, private bhk: BhkService) {
  }

  private token = () => {
    return { [TOKEN]: this.bhk.oauthInfo.value[TOKEN] }
  };

  getData = (page = 0, size = 10) => this.http.get(`${server}/api/co/${toParams({
    ...this.token(),
    page: page,
    size: size
  })}`);

  postData = (body) => this.http.post(`${server}/api/co/${toParams(this.token())}`, body);

  deleteData = (id) => this.http.delete(`${server}/api/co/${id}${toParams(this.token())}`);


  getDocumentProperties = (http = this.http, params?) => this.http.get(`${server}/api/co/utilitas/propertidokumen/${toParams({
    ...params,
    ...this.token()
  })}`);

  getByPoId = (id) => this.http.get(`${apiHost}:${apiPort}/api/co/by/poid/${id}${toParams(this.token())}`);

  getListOfPoDocument = (bodyParams) => this.http.post(`${server}/api/co/utilitas/list/po/${toParams(this.token())}`, bodyParams);

  checkPrByPoId = (poId) => this.http.get(`${server}/api/co/check/pr/${poId}${toParams(this.token())}`);

}
