import {MatSelect} from '@angular/material';
import {FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {delayAnotherProcess, UUID_COLUMN} from './constants';


export class SelectLazy<E> {


  /* Data yang akan dikembalikan, yang merupakan child dari data utama yang berhubungan lagnsung */
  // public dataChild: {
  //   [key: string]: any[];
  // }; 

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
    /* Data yang akan dikembalikan, yang merupakan child dari data utama yang berhubungan lagnsung */
    public dataChild: {
      [key: string]: any[];
    } = {},
    public size = 10,
    /* current page ketika proses fetch dari backend selesai*/
    public page = 0,
    public select?: MatSelect) {
  }


  listenToChilds() {
    const controlKategori = (<FormGroup>this.form.controls[this.controlName]).controls[UUID_COLUMN];
    controlKategori.valueChanges.subscribe(value => {

      for (const controlChild in this.dataChild) {
        if (this.dataChild.hasOwnProperty(controlChild)) {

          if (value === undefined) { // jika nilai yang di dapat adalah undefined
            this.setSubKategoriToInvalid(controlChild);
          }

          if (value !== undefined) {
            if (value !== null) { // jika bukan tombola load lebih banyak yang dipilih
              this.dataChild = {...this.dataChild, [controlChild]: []};

              // this.dataSubKategori = [];
              for (const temp of this.data) {
                if (temp[UUID_COLUMN] === value) {
                  this.dataChild = {...this.dataChild, [controlChild]: [...temp[controlChild]]};
                  // this.dataSubKategori = [...kategori.subKategori];
                  break;
                }
              }
              this.setSubKategoriToInvalid(controlChild);
            }
          }

        }
      }

    });
  }


  setSubKategoriToInvalid(childControl = '') {
    /** set incorrect ke sub kategori jika kategori di ganti **/
    const control = (<FormGroup>this.form.controls[childControl]).controls[UUID_COLUMN];
    if (control.touched) {
      control.setValue(undefined);
    }
    /*=====*/
  }


  isEnabled() {
    return !(<FormGroup>this.form.controls[this.controlName]).controls[UUID_COLUMN].disabled;
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

  _loadMore(callback?: (data?: E[]) => void) {
    if (!this.waitingLoadMore) {
      this.waitingLoadMore = true;
    }

    setTimeout(() => {

      this.fetchFunction(this.page, this.size, this.http).subscribe(
        (value: any) => {
          this.page++;
          if (value !== undefined && value.content !== undefined) {
            const d = value.content;
            if (d !== undefined) {

              this.data = [...this.data];
              this.isLast = value.last;

              if (d.length > 0) {
                d.forEach(v => {
                  this.data.push(v);

                  // mengubah status pengambilan lokasi apakah sudah ditemukan atau belum
                  if (!this.isUuidTrue) {
                    this.isUuidTrue = this.initUuid === v.uuid;
                  }

                  if (this.isInsert) {
                    // (<FormGroup> this.form.controls[this.controlName]).controls[UUID_COLUMN].setValue(this.initUuid);
                    (<FormGroup>this.form.controls[this.controlName]).controls[UUID_COLUMN].enable();
                    for (const child in this.dataChild) {
                      if (this.dataChild.hasOwnProperty(child)) {
                        (<FormGroup>this.form.controls[child]).controls[UUID_COLUMN].enable();
                      }
                    }
                  } else if (!this.isInsert) {
                    if (this.isUuidTrue) {

                      (<FormGroup>this.form.controls[this.controlName]).controls[UUID_COLUMN].enable();
                      for (const child in this.dataChild) {
                        if (this.dataChild.hasOwnProperty(child)) {
                          (<FormGroup>this.form.controls[child]).controls[UUID_COLUMN].enable();
                        }
                      }

                      (<FormGroup>this.form.controls[this.controlName]).controls[UUID_COLUMN].setValue(this.initUuid);

                    } else {
                      (<FormGroup>this.form.controls[this.controlName]).controls[UUID_COLUMN].disable();
                      for (const child in this.dataChild) {
                        if (this.dataChild.hasOwnProperty(child)) {
                          (<FormGroup>this.form.controls[child]).controls[UUID_COLUMN].disable();
                        }
                      }
                    }
                  }

                });

                // jika proses update, load trs datanya sampai dengan sama lokasi dari data yang akan diupdate
                if (!this.isLast && !this.isInsert && !this.isUuidTrue) {
                  this._loadMore();
                }

              } else {
                (<FormGroup>this.form.controls[this.controlName]).controls[UUID_COLUMN].enable();
              }

            }
          }
          this.waitingLoadMore = false;

          if (callback) {
            callback(this.data);
          }
        },
        error => {

          this.failToFetch = true;
          const control = (<FormGroup>this.form.controls[this.controlName]).controls[UUID_COLUMN];
          if (control.touched) {
            control.setValue(undefined);
          } else {
            control.markAsTouched({onlySelf: true});
          }

          if (callback) {
            callback();
          }
        }
      );
    }, delayAnotherProcess);
  }
}

