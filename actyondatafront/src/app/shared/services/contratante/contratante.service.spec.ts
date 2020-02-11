import { TestBed } from '@angular/core/testing';

import { ContratanteService } from './contratante.service';

describe('ContratanteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContratanteService = TestBed.get(ContratanteService);
    expect(service).toBeTruthy();
  });
});
