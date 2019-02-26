import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ComponentUtil} from "../../../../shared/component-util";
import {AppTableDataSource} from "../../../../shared/table-data-source";
import {FormControl} from "@angular/forms";
import {DashboardSharedService} from "../../../../services/dashboard-shared.service";
import {PenawaranWarnaService} from "../../../../services/purchase/co/penawaran-warna.service";
import {MatBottomSheet, MatDialog, MatSnackBar} from "@angular/material";
import {MediaMatcher} from "@angular/cdk/layout";
import {PenawaranWarnaSheetComponent} from "../../co/penawaran-warna/penawaran-warna-sheet/penawaran-warna-sheet.component";
import {CANNOT_PROCESS, ERROR_STATUS_CODE_0} from "../../../../shared/system-error-messages";
import {openAppSnackbar, SNACKBAR_ERROR_STYLE} from "../../../../shared/constants";
import {printWord} from "../../../../shared/utils";
import {DeliveryService} from "../../../../services/purchase/delivery/delivery.service";
import {PemesananPembelianService} from "../../../../services/purchase/po/pemesanan-pembelian.service";

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent extends ComponentUtil<AppTableDataSource>
  implements OnInit, AfterViewInit {

  dataIndexSelected = -1;
  dataStyles = [];
  dataPengiriman = [];
  private isRightClick;

  searchDocumentNumber = new FormControl('');
  searchDocumentNumberPage = 0;
  searchDocumentNumberPreviousValue = '';
  waitingForSearchDocumentNumber = false;
  searchDocumentNumberAction = 0;
  searchDocumentNumberResult: any[] = [];

  errorMessage = '';

  selectedValueByRightClick;


  @ViewChild('searchDocumentTrigger') searchDocumentTriggerElement: ElementRef<HTMLInputElement>;

  constructor(public bhkSharedService: DashboardSharedService,
              private pengirimanService: DeliveryService,
              private pemesananPembelianService: PemesananPembelianService,
              private bottomSheet: MatBottomSheet,
              public changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {
    super(bhkSharedService, changeDetectorRef, media);
  }


  ngAfterViewInit(): void {
    this.searchDocumentNumber.valueChanges.subscribe(value => this.onSearchDocumentNumberTyped(value));
  }

  onSelectedDocument(event) {
    const selectedValue = (event.option) ? event.option.value : {};

    this.searchDocumentTriggerElement.nativeElement.value = '';
    this.searchDocumentNumber.setValue('');

    /* open sheet dialog */
    this.openSheetDialog({
      onCo: selectedValue.onCo,
      poUuid: selectedValue.uuid,
      poNumber: selectedValue.nomorDokumenPo
    });
  }

  cardClicked(cardIndex: number) {
    this.stylingSelectedCard(cardIndex);
  }

  stylingSelectedCard(cardIndex, rightClicked = false) {
    this.isRightClick = rightClicked;

    if (!rightClicked) {
      this.sideNav.close();
    }

    this.dataIndexSelected = cardIndex;
    for (let i = 0; i < this.dataPengiriman.length; i++) {
      this.dataStyles[i] = (i === cardIndex) ? 'mat-card-active' : '';
    }
  }

  cardDoubleClicked(cardIndex, penawaran) {

    this.stylingSelectedCard(cardIndex);
    if (!this.isRightClick) {
      /* open sheet dialog */
      this.openSheetDialog({
        onCo: true,
        poUuid: penawaran.pemesananPembelian.uuid,
        poNumber: penawaran.pemesananPembelian.nomorDokumenPo
      }, false);
    }
  }

  onSelectedMenuOptions(penawaran, edit = true) {
    this.openSheetDialog({
      onCo: true,
      poUuid: penawaran.pemesananPembelian.uuid,
      poNumber: penawaran.pemesananPembelian.nomorDokumenPo
    }, false, edit);
  }

  onTableRightClicked = (event, cardIndex, penawaran) => {
    this.selectedValueByRightClick = penawaran;

    this.isRightClick = true;
    this.showTableMenuOnRightClick(event, this.menuData);
    this.stylingSelectedCard(cardIndex, true);
  };


  openSheetDialog(data: any, fromSearch = true, edit = true) {
    this.bottomSheet.open(PenawaranWarnaSheetComponent, {
      disableClose: true,
      data: {...data, fromSearch: fromSearch, edit: edit}
    }).afterDismissed().subscribe(value => {
      if (value === undefined) {
        return;
      }
      this.getData();
    });
  }

  onSearchDocumentNumberTyped(event) {

    const valueChange = (event.uuid) ? event.uuid : event;
    this.errorMessage = ''; // re init error message

    if (this.searchDocumentNumberPreviousValue === valueChange) {
      this.waitingForSearchDocumentNumber = false;
      return;
    }

    /* memberikan indikator bahwa proses pencarian mulai berjalan */
    if (!this.waitingForSearchDocumentNumber) {
      this.waitingForSearchDocumentNumber = true;
    }

    this.searchDocumentNumberAction++;
    const currentValue = (<string>valueChange).trim();
    this.searchDocumentNumberPreviousValue = currentValue;


    if (currentValue.length > 0) {
      const bodyParams = {
        page: this.searchDocumentNumberPage,
        size: 100,
        documentNumber: currentValue,
        requestAction: this.searchDocumentNumberAction
      };

      setTimeout(() => {
        this.pemesananPembelianService.getListOfPoDocument(bodyParams).pipe()
          .subscribe(
            value => {
              if (value['asyncTry'] === this.searchDocumentNumberAction) {
                this.waitingForSearchDocumentNumber = false;

                if (value['empty']) { // jika data kosong
                  this.errorMessage = 'Data tidak ditemukan...';
                  this.searchDocumentNumberResult = [];
                  this.changeDetectorRef.detectChanges();
                  return;
                }

                this.searchDocumentNumberResult = [...value['page']['content']];
                this.changeDetectorRef.detectChanges();
              }
            },
            error => {
              if (error.status === 0) {
                this.errorMessage = ERROR_STATUS_CODE_0;
              } else {
                if (error.status === 500) {
                  if (error.error.message === undefined) {
                    this.errorMessage = CANNOT_PROCESS;
                  } else {
                    this.errorMessage = error.error.message;
                  }
                } else {
                  this.errorMessage = error.error.message;
                }
              }

              this.changeDetectorRef.detectChanges();
              this.waitingForSearchDocumentNumber = false;
            }
          );
      }, 0);

    } else {
      this.waitingForSearchDocumentNumber = false;
      this.searchDocumentNumberResult = [];
      this.changeDetectorRef.detectChanges();
    }

  }

  ngOnInit() {
    this.getData();

    /* set indicator, bahwa page telah berhasil di load */
    this.bhkSharedService.addLoadingBarIndicator(false);
  }

  callbackGetDataError = (error) => {
    if (error.status === 0) {
      openAppSnackbar(this.snackBar, ERROR_STATUS_CODE_0, SNACKBAR_ERROR_STYLE, 2000);
    } else {
      openAppSnackbar(this.snackBar, error.error.message, SNACKBAR_ERROR_STYLE, 2000);
    }
  };

  /**
   * Callback ketika proses pengambilan data ke server berhasil
   * @param response, response dari server
   */
  callbackGetDataSuccess = (response) => {
    const tempData = <any[]>response['content'];
    // this.initDataStyles(tempData.length);
    this.dataPengiriman = [...tempData];
  };


  initDataStyles(receivedDataLength = 0) {
    for (let i = 0; i < receivedDataLength; i++) {
      this.dataStyles.push('');
    }
  }

  /**
   * Service untuk mengambil data ke server
   */
  getData = (page = this.pageIndex, size = this.pageSize) =>
    this.serviceGetData(this.pengirimanService.getData(page, size), this.callbackGetDataSuccess, this.callbackGetDataError, {
      enableBlocking: false
    });


  noteTooltip(noted: string, length: number) {
    if (noted.length > length) {
      return noted;
    } else {
      return '';
    }
  }

  note(noted: string, length: number) {
    if (noted === undefined || noted.length === 0) {
      return '-';
    } else {
      return printWord(noted, length);
    }

  }

}
