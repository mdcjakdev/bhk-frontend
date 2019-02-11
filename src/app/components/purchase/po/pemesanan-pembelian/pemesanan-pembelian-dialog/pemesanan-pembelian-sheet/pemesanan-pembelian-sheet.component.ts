import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {AppErrorStateMatcher} from '../../../../../../shared/utils';
import {PermintaanPembelianService} from '../../../../../../services/purchase/pr/permintaan-pembelian.service';
import {first} from 'rxjs/operators';
import {Ui} from '../../../../../../shared/ui';

@Component({
  selector: 'app-pemesanan-pembelian-sheet',
  templateUrl: './pemesanan-pembelian-sheet.component.html',
  styleUrls: ['./pemesanan-pembelian-sheet.component.scss']
})
export class PemesananPembelianSheetComponent implements OnInit, AfterViewInit {


  dataPr = [];
  nomorDokumenPr = new FormControl('',);
  ke = 0;

  previousValue = undefined;

  public searchPrMask = ['P', 'R', '.', /[0-9]/, /\d/, /\d/, /\d/,
    '.',
    /\d/, /\d/, /\d/, /\d/, /\d/];
  maskSearch = {
    mask: this.searchPrMask,
    guide: false,
    placeholderChar: '\u2000'
  };

  searchWaiting = false;


  constructor(
    private changeDetector: ChangeDetectorRef,
    private bottomSheetRef: MatBottomSheetRef<PemesananPembelianSheetComponent>,
    private permintaanPemeberlianService: PermintaanPembelianService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
  }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.nomorDokumenPr.valueChanges.subscribe(value => this.onPrDocumentNumberTyped(value));
  }


  onPrDocumentNumberTyped(v) {

    if (this.previousValue === v) {
      this.searchWaiting = false;
      Ui.unblockUI('#result');
      return;
    }

    /* memberikan indikator bahwa proses pencarian mulai berjalan */
    if (!this.searchWaiting) {
      this.searchWaiting = true;
      Ui.blockUI('#result', 0.9, 4, 0, 4);
    }

    this.ke++;
    const nk = (<string>v).trim();
    this.previousValue = nk;

    if (nk.length > 0) {
      setTimeout(() => {
        this.permintaanPemeberlianService.getDocumentForPO(nk, this.ke).pipe()
          .subscribe(value => {
              if (value['asyncTry'] === this.ke) {
                this.searchWaiting = false;
                Ui.unblockUI('#result');

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
              this.searchWaiting = false;
              Ui.unblockUI('#result');
            });
      }, 100)

    } else {
      this.searchWaiting = false;
      Ui.unblockUI('#result');

      this.dataPr = [];
      this.changeDetector.detectChanges();
    }

  }

  openDocument(pr: any) {
    this.bottomSheetRef.dismiss(pr);
    // event.preventDefault();
  }
}
