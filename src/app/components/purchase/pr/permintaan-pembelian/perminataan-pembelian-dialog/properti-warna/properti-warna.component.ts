import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {DialogUtil} from '../../../../../../shared/dialog-util';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {permintaanPembelianDetailWarnaErrorStateMatchers, permintaanPembelianDetailWarnaForm} from '../../../../../../inits/purchase/pr/pr-init';
import {MasterUnitService} from '../../../../../../services/master/master-unit/master-unit.service';
import {createNumberMask} from 'text-mask-addons/dist/textMaskAddons';
import {SelectLazy} from '../../../../../../shared/select-lazy';
import {MasterLokasi} from '../../../../../../inits/master/master-lokasi-init';
import {MasterUnit} from '../../../../../../inits/master/master-unit-init';

@Component({
  selector: 'app-properti-warna',
  templateUrl: './properti-warna.component.html',
  styleUrls: ['./properti-warna.component.scss']
})
export class PropertiWarnaComponent extends DialogUtil implements OnInit, AfterViewInit {

  close = undefined;

  @ViewChild('selectUnit') selectUnit;
  unitLazy: SelectLazy<MasterUnit>;

  masker = {
    mask: createNumberMask({
      prefix: '',
      suffix: '',
      allowDecimal: true,
      thousandsSeparatorSymbol: '.',
      decimalSymbol: ','
    }),
    guide: false,
    placeholderChar: '\u2000'
  };

  constructor(dialogRef: MatDialogRef<PropertiWarnaComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              public snackBar: MatSnackBar,
              public masterUnitService: MasterUnitService) {
    super(dialogRef,
      data,
      permintaanPembelianDetailWarnaForm(data.data, data.disables),
      permintaanPembelianDetailWarnaErrorStateMatchers);

    // init untuk data unit
    this.unitLazy = new SelectLazy(
      this.form,
      'unit',
      masterUnitService.http,
      masterUnitService.getData,
      data.data.unit.uuid, data.action);
  }

  ngOnInit() {
    this.unitLazy._loadMore();
  }

  ngAfterViewInit(): void {
    this.unitLazy.select = this.selectUnit;
  }


  ok(values) {
    this.dialogRef.close({values: values});
  }


  okButtonCondition() {
    return (this.form.invalid || this.unitLazy.waitingLoadMore || this.unitLazy.failToFetch);
  }

}
