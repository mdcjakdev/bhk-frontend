import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {AppErrorStateMatcher} from '../../../../../shared/utils';
import {PermintaanPembelianService} from '../../../../../services/pr/permintaan-pembelian.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-pemesanan-pembelian-sheet',
  templateUrl: './pemesanan-pembelian-sheet.component.html',
  styleUrls: ['./pemesanan-pembelian-sheet.component.scss']
})
export class PemesananPembelianSheetComponent implements OnInit, AfterViewInit {


  dataPr = [];
  nomorDokumenPr = new FormControl('', );
  ke = 0;

  previousValue = undefined;

  public searchPrMask = ['P', 'R', '.', /[0-9]/, /\d/, /\d/, /\d/,
    '.',
    /\d/, /\d/,  /\d/, /\d/, /\d/]
  maskSearch = {
    mask: this.searchPrMask,
    guide: false,
    placeholderChar: '\u2000'
  };



  constructor(
    private changeDetector: ChangeDetectorRef,
    private bottomSheetRef: MatBottomSheetRef<PemesananPembelianSheetComponent>,
              private permintaanPemeberlianService: PermintaanPembelianService,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss({ haha: 'sssssssss'});
    event.preventDefault();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.nomorDokumenPr.valueChanges.subscribe(value => this.onPrDocumentNumberTyped(value));
  }


  onPrDocumentNumberTyped(v) {
    if (this.previousValue === v) {
      return;
    }

    this.ke++;
    const nk = (<string> v).trim();
    this.previousValue = nk;

    if (nk.length > 0) {
      this.permintaanPemeberlianService.getDocumentForPO(nk, this.ke).pipe()
        .subscribe(value => {
            if (value['asyncTry'] === this.ke) {
              if (value['empty']) { // jika data kosong
                this.dataPr = [];
                this.changeDetector.detectChanges();
                return;
              }

              this.dataPr = [...value['page']['content']];
              this.changeDetector.detectChanges();
            }
          },
          error1 => {
            // this.dataPr = [];
            this.changeDetector.detectChanges();
          });
    } else {
      this.dataPr = [];
      this.changeDetector.detectChanges();
    }

  }

  openDocument(pr: any) {
    this.bottomSheetRef.dismiss(pr);
    event.preventDefault();
  }
}
