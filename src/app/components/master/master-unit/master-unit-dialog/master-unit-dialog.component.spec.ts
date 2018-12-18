import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterUnitDialogComponent } from './master-unit-dialog.component';

describe('MasterUnitDialogComponent', () => {
  let component: MasterUnitDialogComponent;
  let fixture: ComponentFixture<MasterUnitDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterUnitDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterUnitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
