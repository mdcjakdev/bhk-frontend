import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PemesananPembelianComponent } from './pemesanan-pembelian.component';

describe('PemesananPembelianComponent', () => {
  let component: PemesananPembelianComponent;
  let fixture: ComponentFixture<PemesananPembelianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PemesananPembelianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PemesananPembelianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
