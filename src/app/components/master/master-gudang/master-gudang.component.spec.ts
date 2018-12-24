import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterGudangComponent } from './master-gudang.component';

describe('MasterGudangComponent', () => {
  let component: MasterGudangComponent;
  let fixture: ComponentFixture<MasterGudangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterGudangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterGudangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
