import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCategoryDialogComponent } from './master-category-dialog.component';

describe('MasterCategoryDialogComponent', () => {
  let component: MasterCategoryDialogComponent;
  let fixture: ComponentFixture<MasterCategoryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCategoryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
