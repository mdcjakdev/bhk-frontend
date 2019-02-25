import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {server, TOKEN} from '../../../shared/constants';
import {BhkService} from "../../bhk.service";
import {toParams} from "../../../shared/utils";

@Injectable()
export class PenggunaService {

  constructor(public http: HttpClient, private bhk: BhkService) {}

  private token = () => {
    return {[TOKEN]: this.bhk.oauthInfo.value[TOKEN]}
  };

  getData = (page = 0, size = 10) => this.http.get(`${server}/api/administrator/pengguna/${toParams({
    ...this.token(),
    page: page,
    size: size
  })}`);

  postData = (body) => this.http.post(`${server}/api/administrator/pengguna/${toParams(this.token())}`, body);

  deleteData = (id) => this.http.delete(`${server}/api/administrator/pengguna/${id}${toParams(this.token())}`);



}
