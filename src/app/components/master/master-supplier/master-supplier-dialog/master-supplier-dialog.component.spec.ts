import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSupplierDialogComponent } from './master-supplier-dialog.component';

describe('MasterSupplierDialogComponent', () => {
  let component: MasterSupplierDialogComponent;
  let fixture: ComponentFixture<MasterSupplierDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSupplierDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSupplierDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
