import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverySheetComponent } from './delivery-sheet.component';

describe('DeliverySheetComponent', () => {
  let component: DeliverySheetComponent;
  let fixture: ComponentFixture<DeliverySheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverySheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverySheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
