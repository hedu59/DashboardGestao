import { TestBed } from '@angular/core/testing';

import { CarteiraAtivaService } from './carteira-ativa.service';

describe('CarteiraAtivaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarteiraAtivaService = TestBed.get(CarteiraAtivaService);
    expect(service).toBeTruthy();
  });
});
