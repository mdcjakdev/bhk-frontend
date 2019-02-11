import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiWarnaComponent } from './properti-warna.component';

describe('PropertiWarnaComponent', () => {
  let component: PropertiWarnaComponent;
  let fixture: ComponentFixture<PropertiWarnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertiWarnaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiWarnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
