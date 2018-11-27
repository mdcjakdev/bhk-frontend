import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiHost, apiPort} from '../../shared/constants';
import {BhkModule} from '../../modules/bhk/bhk.module';

@Injectable()
export class MasterUnitService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(apiHost + ':' + apiPort + '/api/pengaturan/guru/?page=0&size=10');
  }

}
