import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiWarnaPoComponent } from './properti-warna-po.component';

describe('PropertiWarnaPoComponent', () => {
  let component: PropertiWarnaPoComponent;
  let fixture: ComponentFixture<PropertiWarnaPoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertiWarnaPoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiWarnaPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
