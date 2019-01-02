import {MatSelect} from '@angular/material';
import {FormGroup} from '@angular/forms';
import {init} from 'protractor/built/launcher';
import {HttpClient} from '@angular/common/http';
import {delayAnotherProcess} from './constants';


export class SelectLazy<E> {

  /* Data yang akan dikembalikan, yang merupaka data hasil dari pengambilan di database */
  public data: E[] = [];

  /* Element dari mat select */
  private _select: MatSelect;

  /*Status menunggu ketika fetch data dari database */
  public waitingLoadMore = false;

  /*Jika data yang baru terambil adalah data terakhir*/
  public isLast = false;

  /* paramter jika data uuid nya berhasi diambil dari database */
  public isUuidTrue = false;

  /* status jika prses fetch ke databas gagal*/
  public failToFetch = false;


  constructor(
    public form: FormGroup,
    public controlName: string,
    public http: HttpClient,
    public fetchFunction: Function,
    public initUuid: any,
    public isInsert: boolean,
    public select?: MatSelect,
    public size = 10,

    /* current page ketika proses fetch dari backend selesai*/
    public page = 0) {
  }

  isEnabled() {
    // if (this.controlName === undefined) {
    //   return false;
    // }

    return !(<FormGroup> this.form.controls[this.controlName]).controls['uuid'].disabled;
  }

  refresh() {
    this.failToFetch = false;
    this.waitingLoadMore = false;
    this.loadMore();
  }

  loadMore() {
    this.select.open();
    if (!this.waitingLoadMore) {
      // ubah jadi status menunggu proses load data selesai jadi true
      this.waitingLoadMore = true;
      setTimeout(() => {
        this._loadMore();
      }, 0);
    }
  }

  _loadMore() {
    setTimeout(() => {
      this.fetchFunction(this.page, this.size, this.http).subscribe(
        (value: any) => {
          this.page++;
          if (value !== undefined && value.content !== undefined) {
            const d = value.content;
            if (d !== undefined) {
              this.data = [...this.data];
              d.forEach(v => {
                this.data.push(v);

                // mengubah status pengambilan lokasi apakah sudah ditemukan atau belum
                if (!this.isUuidTrue) {
                  this.isUuidTrue = this.initUuid === v.uuid;
                }

                if (this.isInsert) {
                  (<FormGroup> this.form.controls[this.controlName]).controls['uuid'].enable();
                } else if (!this.isInsert) {
                  if (this.isUuidTrue) {
                    (<FormGroup> this.form.controls[this.controlName]).controls['uuid'].enable();
                  } else {
                    (<FormGroup> this.form.controls[this.controlName]).controls['uuid'].disable();
                  }
                }

              });

              this.isLast = value.last;

              // jika proses update, load trs datanya sampai dengan sama lokasi dari data yang akan diupdate
              if (!this.isLast && !this.isInsert && !this.isUuidTrue) {
                this._loadMore();
              }
            }
          }
          this.waitingLoadMore = false;


        },
        error => {
          this.failToFetch = true;
        }
      );
    }, delayAnotherProcess)
  }
}

