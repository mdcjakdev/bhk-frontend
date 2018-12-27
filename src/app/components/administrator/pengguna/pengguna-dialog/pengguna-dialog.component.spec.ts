import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenggunaDialogComponent } from './pengguna-dialog.component';

describe('PenggunaDialogComponent', () => {
  let component: PenggunaDialogComponent;
  let fixture: ComponentFixture<PenggunaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenggunaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenggunaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
