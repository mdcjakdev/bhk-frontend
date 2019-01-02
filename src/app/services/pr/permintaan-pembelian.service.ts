import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiHost, apiPort} from '../../shared/constants';

@Injectable()
export class PermintaanPembelianService {

  constructor(public http: HttpClient) { }

  getData(page = 0, size = 10, http = this.http) {
    return http.get(apiHost + ':' + apiPort + '/api/pr/?page=' + page + '&size=' + size);
  }

  getDocumentProperties(http = this.http) {
    return http.get(apiHost + ':' + apiPort + '/api/pr/utilitas/propertidokumen/');
  }

  postData(body) {
    return this.http.post(apiHost + ':' + apiPort + '/api/pr/', body);
  }

  putData(id, body) {
    return this.http.put(apiHost + ':' + apiPort + '/api/pr/' + id, body);
  }

  deleteData(id) {
    return this.http.delete(apiHost + ':' + apiPort + '/api/pr/' + id);
  }
  
}
