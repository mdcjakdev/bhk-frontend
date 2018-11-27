import { TestBed } from '@angular/core/testing';

import { MasterUnitService } from './master-unit.service';

describe('MasterUnitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterUnitService = TestBed.get(MasterUnitService);
    expect(service).toBeTruthy();
  });
});
