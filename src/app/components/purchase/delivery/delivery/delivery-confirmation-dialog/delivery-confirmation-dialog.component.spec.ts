import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryConfirmationDialogComponent } from './delivery-confirmation-dialog.component';

describe('DeliveryConfirmationDialogComponent', () => {
  let component: DeliveryConfirmationDialogComponent;
  let fixture: ComponentFixture<DeliveryConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryConfirmationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
