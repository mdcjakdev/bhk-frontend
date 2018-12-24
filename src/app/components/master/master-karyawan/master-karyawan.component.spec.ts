import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterKaryawanComponent } from './master-karyawan.component';

describe('MasterKaryawanComponent', () => {
  let component: MasterKaryawanComponent;
  let fixture: ComponentFixture<MasterKaryawanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterKaryawanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterKaryawanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
