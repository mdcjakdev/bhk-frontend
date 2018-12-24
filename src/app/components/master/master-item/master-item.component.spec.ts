import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterItemComponent } from './master-item.component';

describe('MasterItemComponent', () => {
  let component: MasterItemComponent;
  let fixture: ComponentFixture<MasterItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
