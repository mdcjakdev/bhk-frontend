import { TestBed } from '@angular/core/testing';

import { PermintaanPembelianService } from './permintaan-pembelian.service';

describe('PermintaanPembelianService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PermintaanPembelianService = TestBed.get(PermintaanPembelianService);
    expect(service).toBeTruthy();
  });
});
