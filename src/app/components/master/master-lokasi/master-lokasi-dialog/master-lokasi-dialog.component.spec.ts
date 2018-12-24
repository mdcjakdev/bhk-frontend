import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterLokasiDialogComponent } from './master-lokasi-dialog.component';

describe('MasterLokasiDialogComponent', () => {
  let component: MasterLokasiDialogComponent;
  let fixture: ComponentFixture<MasterLokasiDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterLokasiDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterLokasiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
