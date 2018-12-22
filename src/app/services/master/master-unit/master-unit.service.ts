import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiHost, apiPort} from '../../../shared/constants';
import {BhkModule} from '../../../modules/bhk/bhk.module';

@Injectable()
export class MasterUnitService {

  constructor(private http: HttpClient) { }


  getData(page = 0, size = 10) {
    return this.http.get(apiHost + ':' + apiPort + '/api/master/unit/?page=' + page + '&size=' + size);
  }

  postData(body) {
    return this.http.post(apiHost + ':' + apiPort + '/api/master/unit/', body);
  }

  putData(id, body) {
    return this.http.put(apiHost + ':' + apiPort + '/api/master/unit/' + id, body);
  }

  deleteData(id) {
    return this.http.delete(apiHost + ':' + apiPort + '/api/master/unit/' + id);
  }


}
