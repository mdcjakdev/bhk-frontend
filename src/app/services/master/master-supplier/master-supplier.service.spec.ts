import { TestBed } from '@angular/core/testing';

import { MasterSupplierService } from './master-supplier.service';

describe('MasterSupplierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterSupplierService = TestBed.get(MasterSupplierService);
    expect(service).toBeTruthy();
  });
});
