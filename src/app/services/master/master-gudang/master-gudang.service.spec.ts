import { TestBed } from '@angular/core/testing';

import { MasterGudangService } from './master-gudang.service';

describe('MasterGudangService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterGudangService = TestBed.get(MasterGudangService);
    expect(service).toBeTruthy();
  });
});
