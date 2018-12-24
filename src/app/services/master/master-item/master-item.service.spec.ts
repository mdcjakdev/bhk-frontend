import { TestBed } from '@angular/core/testing';

import { MasterItemService } from './master-item.service';

describe('MasterItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterItemService = TestBed.get(MasterItemService);
    expect(service).toBeTruthy();
  });
});
