import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-penawaran-warna-dialog-info-detail',
  templateUrl: './penawaran-warna-dialog-info-detail.component.html',
  styleUrls: ['./penawaran-warna-dialog-info-detail.component.scss']
})
export class PenawaranWarnaDialogInfoDetailComponent implements OnInit {



  constructor(public dialogRef: MatDialogRef<PenawaranWarnaDialogInfoDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  accepted(info: any) {
    return info.status === 'ACC';
  }

  status(info: any) {
    return (info.status === 'ACC') ? 'Setuju' : 'Tidak Setuju';
  }

  getNamaKainOrAlias() {
    const l = (this.data.item.namaAlias) ? this.data.item.namaAlias.length : 0;
    if (l === 0) {
      return this.data.item.namaKain;
    } else {
      return this.data.item.namaAlias[l - 1];
    }
  }

}
