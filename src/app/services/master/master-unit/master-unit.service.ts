import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiHost, apiPort} from '../../../shared/constants';

@Injectable()
export class MasterUnitService {

  constructor(public http: HttpClient) { }

  getData = (page = 0, size = 10) =>  this.http.get(apiHost + ':' + apiPort + '/api/master/unit/?page=' + page + '&size=' + size);

  // getData(page = 0, size = 10, http = this.http) {
  //   return http.get(apiHost + ':' + apiPort + '/api/master/unit/?page=' + page + '&size=' + size);
  // }

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
