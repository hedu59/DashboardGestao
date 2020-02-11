import { CarteiraModule } from './carteira.module';

describe('CarteiraModule', () => {
  let carteiraModule: CarteiraModule;

  beforeEach(() => {
    carteiraModule = new CarteiraModule();
  });

  it('should create an instance', () => {
    expect(carteiraModule).toBeTruthy();
  });
});
