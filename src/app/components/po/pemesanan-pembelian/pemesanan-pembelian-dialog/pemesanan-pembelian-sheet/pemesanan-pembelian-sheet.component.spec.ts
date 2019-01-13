import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PemesananPembelianSheetComponent } from './pemesanan-pembelian-sheet.component';

describe('PemesananPembelianSheetComponent', () => {
  let component: PemesananPembelianSheetComponent;
  let fixture: ComponentFixture<PemesananPembelianSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PemesananPembelianSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PemesananPembelianSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
