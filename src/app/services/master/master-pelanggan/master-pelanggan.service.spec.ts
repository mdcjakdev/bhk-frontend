import { TestBed } from '@angular/core/testing';

import { MasterPelangganService } from './master-pelanggan.service';

describe('MasterPelangganService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterPelangganService = TestBed.get(MasterPelangganService);
    expect(service).toBeTruthy();
  });
});
