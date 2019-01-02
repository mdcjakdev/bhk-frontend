import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiHost, apiPort} from '../shared/constants';

@Injectable()
export class ServerService {

  constructor(private http: HttpClient) { }

  getServerDate() {
    return this.http.get(apiHost + ':' + apiPort + '/api/utilitas/tanggal/');
  }

}
