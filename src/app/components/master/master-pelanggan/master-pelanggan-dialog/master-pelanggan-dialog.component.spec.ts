import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPelangganDialogComponent } from './master-pelanggan-dialog.component';

describe('MasterPelangganDialogComponent', () => {
  let component: MasterPelangganDialogComponent;
  let fixture: ComponentFixture<MasterPelangganDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterPelangganDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterPelangganDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
