import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {server, TOKEN} from '../../../shared/constants';
import {BhkService} from "../../bhk.service";
import {toParams} from "../../../shared/utils";

@Injectable()
export class PermintaanPembelianService {

  constructor(public http: HttpClient, private bhk: BhkService) {
  }

  private token = () => {
    return { [TOKEN]: this.bhk.oauthInfo.value[TOKEN] }
  };

  getData = (page = 0, size = 10) => this.http.get(`${server}/api/pr/${toParams({
    ...this.token(),
    page: page,
    size: size
  })}`);

  postData = (body) => this.http.post(`${server}/api/pr/${toParams(this.token())}`, body);

  deleteData = (id) => this.http.delete(`${server}/api/pr/${id}${toParams(this.token())}`);

  getDocumentProperties = () => this.http.get(`${server}/api/pr/utilitas/propertidokumen/${toParams(this.token())}`);

  getDocumentForPO = (nomorDokumen, ke) => this.http.get(`${server}/api/pr/dokumen/po/${toParams({
    ...this.token(),
    nomorDokumen: nomorDokumen,
    ke: ke
  })}`);

}
