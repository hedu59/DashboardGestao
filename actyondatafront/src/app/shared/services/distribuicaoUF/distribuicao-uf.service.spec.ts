import { TestBed } from '@angular/core/testing';

import { DistribuicaoUFService } from './distribuicao-uf.service';

describe('DistribuicaoUFService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DistribuicaoUFService = TestBed.get(DistribuicaoUFService);
    expect(service).toBeTruthy();
  });
});
