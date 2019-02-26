import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryDialogWarnaComponent } from './delivery-dialog-warna.component';

describe('DeliveryDialogWarnaComponent', () => {
  let component: DeliveryDialogWarnaComponent;
  let fixture: ComponentFixture<DeliveryDialogWarnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryDialogWarnaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryDialogWarnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
