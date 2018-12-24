import { Injectable } from '@angular/core';
import {apiHost, apiPort} from '../../../shared/constants';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MasterPelangganService {

  constructor(private http: HttpClient) { }

  getData(page = 0, size = 10) {
    return this.http.get(apiHost + ':' + apiPort + '/api/master/pelanggan/?page=' + page + '&size=' + size);
  }

  postData(body) {
    return this.http.post(apiHost + ':' + apiPort + '/api/master/pelanggan/', body);
  }

  putData(id, body) {
    return this.http.put(apiHost + ':' + apiPort + '/api/master/pelanggan/' + id, body);
  }

  deleteData(id) {
    return this.http.delete(apiHost + ':' + apiPort + '/api/master/pelanggan/' + id);
  }
}
