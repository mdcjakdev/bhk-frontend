import { TestBed } from '@angular/core/testing';

import { MasterLokasiService } from './master-lokasi.service';

describe('MasterLokasiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterLokasiService = TestBed.get(MasterLokasiService);
    expect(service).toBeTruthy();
  });
});
