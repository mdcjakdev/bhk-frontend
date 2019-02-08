import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-penawaran-warna-confirmation-dialog',
  templateUrl: './penawaran-warna-confirmation-dialog.component.html',
  styleUrls: ['./penawaran-warna-confirmation-dialog.component.scss']
})
export class PenawaranWarnaConfirmationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PenawaranWarnaConfirmationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
