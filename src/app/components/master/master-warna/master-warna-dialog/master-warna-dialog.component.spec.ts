import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterWarnaDialogComponent } from './master-warna-dialog.component';

describe('MasterWarnaDialogComponent', () => {
  let component: MasterWarnaDialogComponent;
  let fixture: ComponentFixture<MasterWarnaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterWarnaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterWarnaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
