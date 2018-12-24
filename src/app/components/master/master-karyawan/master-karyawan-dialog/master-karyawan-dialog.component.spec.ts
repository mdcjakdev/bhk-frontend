import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterKaryawanDialogComponent } from './master-karyawan-dialog.component';

describe('MasterKaryawanDialogComponent', () => {
  let component: MasterKaryawanDialogComponent;
  let fixture: ComponentFixture<MasterKaryawanDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterKaryawanDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterKaryawanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
