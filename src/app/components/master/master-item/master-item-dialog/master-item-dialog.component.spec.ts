import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterItemDialogComponent } from './master-item-dialog.component';

describe('MasterItemDialogComponent', () => {
  let component: MasterItemDialogComponent;
  let fixture: ComponentFixture<MasterItemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterItemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
