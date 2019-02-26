import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryDialogWarnaInfoComponent } from './delivery-dialog-warna-info.component';

describe('DeliveryDialogWarnaInfoComponent', () => {
  let component: DeliveryDialogWarnaInfoComponent;
  let fixture: ComponentFixture<DeliveryDialogWarnaInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryDialogWarnaInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryDialogWarnaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
