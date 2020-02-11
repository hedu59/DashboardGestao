import { FichaModule } from './ficha.module';

describe('FichaModule', () => {
  let fichaModule: FichaModule;

  beforeEach(() => {
    fichaModule = new FichaModule();
  });

  it('should create an instance', () => {
    expect(fichaModule).toBeTruthy();
  });
});
