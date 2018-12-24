import { TestBed } from '@angular/core/testing';

import { MasterWarnaService } from './master-warna.service';

describe('MasterWarnaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterWarnaService = TestBed.get(MasterWarnaService);
    expect(service).toBeTruthy();
  });
});
