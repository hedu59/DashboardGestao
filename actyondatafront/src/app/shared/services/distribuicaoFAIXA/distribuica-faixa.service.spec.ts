import { TestBed } from '@angular/core/testing';

import { DistribuicaFaixaService } from './distribuica-faixa.service';

describe('DistribuicaFaixaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DistribuicaFaixaService = TestBed.get(DistribuicaFaixaService);
    expect(service).toBeTruthy();
  });
});
