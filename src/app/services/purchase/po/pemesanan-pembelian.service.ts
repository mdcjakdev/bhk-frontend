import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiHost, apiPort} from '../../../shared/constants';
import {convertObjectAsHttpParams} from '../../../shared/utils';
import {PemesananPembelian} from '../../../inits/purchase/po/po-init';
import {Observable} from 'rxjs';

@Injectable()
export class PemesananPembelianService {

  constructor(public http: HttpClient) { }

  getData(page = 0, size = 10, http = this.http) {
    return http.get(apiHost + ':' + apiPort + '/api/po/?page=' + page + '&size=' + size);
  }

  getDocumentProperties(http = this.http, params?) {
    let url = '/api/po/utilitas/propertidokumen/'
    url += ((params !== undefined || params !== null) ? convertObjectAsHttpParams(params, url) : '');
    return http.get(apiHost + ':' + apiPort + url);
  }

  postData(body) {
    return this.http.post(apiHost + ':' + apiPort + '/api/po/', body);
  }

  putData(id, body) {
    return this.http.put(apiHost + ':' + apiPort + '/api/po/' + id, body);
  }

  deleteData(id) {
    return this.http.delete(apiHost + ':' + apiPort + '/api/po/' + id);
  }


  getDataById(id): Observable<PemesananPembelian> {
    return this.http.get<PemesananPembelian>(`${apiHost}:${apiPort}/api/po/${id}`);
  }




  checkPrByPoId(poId) {
    return this.http.get(apiHost + ':' + apiPort + '/api/po/check/pr/' + poId);
  }

}
