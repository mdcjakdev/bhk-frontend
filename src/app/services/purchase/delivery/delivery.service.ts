import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BhkService} from "../../bhk.service";
import {server, TOKEN} from "../../../shared/constants";
import {toParams} from "../../../shared/utils";

@Injectable()
export class DeliveryService {

  constructor(public http: HttpClient, private bhk: BhkService) {
  }

  private token = () => {
    return { [TOKEN]: this.bhk.oauthInfo.value[TOKEN] }
  };

  getData = (page = 0, size = 10) => this.http.get(`${server}/api/delivery/${toParams({
    ...this.token(),
    page: page,
    size: size
  })}`);

  postData = (body) => this.http.post(`${server}/api/delivery/${toParams(this.token())}`, body);

  deleteData = (id) => this.http.delete(`${server}/api/delivery/${id}${toParams(this.token())}`);
}
