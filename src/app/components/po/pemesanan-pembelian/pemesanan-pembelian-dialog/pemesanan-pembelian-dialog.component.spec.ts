import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PemesananPembelianDialogComponent } from './pemesanan-pembelian-dialog.component';

describe('PemesananPembelianDialogComponent', () => {
  let component: PemesananPembelianDialogComponent;
  let fixture: ComponentFixture<PemesananPembelianDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PemesananPembelianDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PemesananPembelianDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
