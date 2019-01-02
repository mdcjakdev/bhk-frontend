import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermintaanPembelianComponent } from './permintaan-pembelian.component';

describe('PermintaanPembelianComponent', () => {
  let component: PermintaanPembelianComponent;
  let fixture: ComponentFixture<PermintaanPembelianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermintaanPembelianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermintaanPembelianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
