import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermintaanPembelianDialogComponent } from './perminataan-pembelian-dialog.component';

describe('PermintaanPembelianDialogComponent', () => {
  let component: PermintaanPembelianDialogComponent;
  let fixture: ComponentFixture<PermintaanPembelianDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermintaanPembelianDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermintaanPembelianDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
