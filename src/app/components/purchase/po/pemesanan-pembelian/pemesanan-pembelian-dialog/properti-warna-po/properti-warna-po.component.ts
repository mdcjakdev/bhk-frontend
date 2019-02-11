import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {DialogUtil} from '../../../../../../shared/dialog-util';
import {SelectLazy} from '../../../../../../shared/select-lazy';
import {MasterUnit} from '../../../../../../inits/master/master-unit-init';
import {createNumberMask} from '../../../../../../../../node_modules/text-mask-addons/dist/textMaskAddons';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {MasterUnitService} from '../../../../../../services/master/master-unit/master-unit.service';
import {permintaanPembelianDetailWarnaErrorStateMatchers, permintaanPembelianDetailWarnaForm} from '../../../../../../inits/purchase/pr/pr-init';
import {pemesananPembelianDetailWarnaErrorStateMatchers, pemesananPembelianDetailWarnaForm} from '../../../../../../inits/purchase/po/po-init';

@Component({
  selector: 'app-properti-warna-po',
  templateUrl: './properti-warna-po.component.html',
  styleUrls: ['./properti-warna-po.component.scss']
})
export class PropertiWarnaPoComponent extends DialogUtil implements OnInit, AfterViewInit {

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

  constructor(dialogRef: MatDialogRef<PropertiWarnaPoComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              public snackBar: MatSnackBar,
              public masterUnitService: MasterUnitService) {
    super(dialogRef,
      data,
      pemesananPembelianDetailWarnaForm(data.data, data.disables),
      pemesananPembelianDetailWarnaErrorStateMatchers);

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
