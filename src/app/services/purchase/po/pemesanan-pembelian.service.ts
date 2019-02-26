import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {server, TOKEN} from '../../../shared/constants';
import {toParams} from '../../../shared/utils';
import {PemesananPembelian} from '../../../inits/purchase/po/po-init';
import {Observable} from 'rxjs';
import {BhkService} from "../../bhk.service";

@Injectable()
export class PemesananPembelianService {

  constructor(public http: HttpClient, private bhk: BhkService) {
  }

  private token = () => {
    return {[TOKEN]: this.bhk.oauthInfo.value[TOKEN]}
  };

  getData = (page = 0, size = 10) => this.http.get(`${server}/api/po/${toParams({
    ...this.token(),
    page: page,
    size: size
  })}`);

  postData = (body) => this.http.post(`${server}/api/po/${toParams(this.token())}`, body);

  deleteData = (id) => this.http.delete(`${server}/api/po/${id}${toParams(this.token())}`);

  getDocumentProperties = (params?) => this.http.get(`${server}/api/po/utilitas/propertidokumen/${toParams({
    ...params,
    ...this.token()
  })}`);

  getDataById = (id): Observable<PemesananPembelian> => this.http.get<PemesananPembelian>(`${server}/api/po/${id}${toParams(this.token())}`);

  checkPrByPoId = (poId) => this.http.get(`${server}/api/po/check/pr/${poId}${toParams(this.token())}`);

  /**
   * Mengmambil data dokumen po berdasarkan nomor dokumen yang seperti
   * @param bodyParams parameter data { page, size, requestAction, documentNumber}
   */
  getListOfPoDocument = (bodyParams) => this.http.post(`${server}/api/po/utilitas/listof/like${toParams(this.token())}`, bodyParams);

}
