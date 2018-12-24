import { TestBed } from '@angular/core/testing';

import { MasterKaryawanService } from './master-karyawan.service';

describe('MasterKaryawanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterKaryawanService = TestBed.get(MasterKaryawanService);
    expect(service).toBeTruthy();
  });
});
