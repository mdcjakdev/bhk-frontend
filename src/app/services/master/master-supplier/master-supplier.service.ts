import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiHost, apiPort} from '../../../shared/constants';

@Injectable()
export class MasterSupplierService {

  constructor(private http: HttpClient) { }

  getData(page = 0, size = 10) {
    return this.http.get(apiHost + ':' + apiPort + '/api/master/supplier/?page=' + page + '&size=' + size);
  }

  postData(body) {
    return this.http.post(apiHost + ':' + apiPort + '/api/master/supplier/', body);
  }

  putData(id, body) {
    return this.http.put(apiHost + ':' + apiPort + '/api/master/supplier/' + id, body);
  }

  deleteData(id) {
    return this.http.delete(apiHost + ':' + apiPort + '/api/master/supplier/' + id);
  }
}
