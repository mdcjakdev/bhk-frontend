import { Injectable } from '@angular/core';
import {apiHost, apiPort} from '../../../shared/constants';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MasterCategoryService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(apiHost + ':' + apiPort + '/api/master/category/?page=0&size=10');
  }

  postData(body) {
    return this.http.post(apiHost + ':' + apiPort + '/api/master/category/', body);
  }

  putData(id, body) {
    return this.http.put(apiHost + ':' + apiPort + '/api/master/category/' + id, body);
  }

  deleteData(id) {
    return this.http.delete(apiHost + ':' + apiPort + '/api/master/category/' + id);
  }
}
