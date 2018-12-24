import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterWarnaComponent } from './master-warna.component';

describe('MasterWarnaComponent', () => {
  let component: MasterWarnaComponent;
  let fixture: ComponentFixture<MasterWarnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterWarnaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterWarnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
