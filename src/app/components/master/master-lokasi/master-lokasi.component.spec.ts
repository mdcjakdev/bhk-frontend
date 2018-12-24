import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterLokasiComponent } from './master-lokasi.component';

describe('MasterLokasiComponent', () => {
  let component: MasterLokasiComponent;
  let fixture: ComponentFixture<MasterLokasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterLokasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterLokasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
