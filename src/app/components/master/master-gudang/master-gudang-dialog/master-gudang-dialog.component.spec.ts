import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterGudangDialogComponent } from './master-gudang-dialog.component';

describe('MasterGudangDialogComponent', () => {
  let component: MasterGudangDialogComponent;
  let fixture: ComponentFixture<MasterGudangDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterGudangDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterGudangDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
