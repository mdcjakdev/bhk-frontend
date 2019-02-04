import { Injectable } from '@angular/core';
import {apiHost, apiPort} from '../../shared/constants';
import {convertObjectAsHttpParams} from '../../shared/utils';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PenawaranWarnaService {

  constructor(public http: HttpClient) { }


  getData(page = 0, size = 10, http = this.http) {
    return http.get(apiHost + ':' + apiPort + '/api/co/?page=' + page + '&size=' + size);
  }

  getDocumentProperties(http = this.http, params?) {
    let url = '/api/co/utilitas/propertidokumen/'
    url += ((params !== undefined || params !== null) ? convertObjectAsHttpParams(params, url) : '');
    return http.get(apiHost + ':' + apiPort + url);
  }

  getListOfPoDocument(bodyParams) {
    return this.http.post(apiHost + ':' + apiPort + '/api/co/utilitas/list/po/', bodyParams);
  }

  postData(body) {
    return this.http.post(apiHost + ':' + apiPort + '/api/co/', body);
  }

  putData(id, body) {
    return this.http.put(apiHost + ':' + apiPort + '/api/co/' + id, body);
  }

  deleteData(id) {
    return this.http.delete(apiHost + ':' + apiPort + '/api/co/' + id);
  }


  checkPrByPoId(poId) {
    return this.http.get(apiHost + ':' + apiPort + '/api/co/check/pr/' + poId);
  }

}
