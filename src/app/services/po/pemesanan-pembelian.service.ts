import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiHost, apiPort} from '../../shared/constants';

@Injectable()
export class PemesananPembelianService {

  constructor(public http: HttpClient) { }

  getData(page = 0, size = 10, http = this.http) {
    return http.get(apiHost + ':' + apiPort + '/api/po/?page=' + page + '&size=' + size);
  }

  getDocumentProperties(http = this.http) {
    return http.get(apiHost + ':' + apiPort + '/api/po/utilitas/propertidokumen/');
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

}