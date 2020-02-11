import { TestBed } from '@angular/core/testing';

import { ProdutividadeService } from './produtividade.service';

describe('ProdutividadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdutividadeService = TestBed.get(ProdutividadeService);
    expect(service).toBeTruthy();
  });
});
