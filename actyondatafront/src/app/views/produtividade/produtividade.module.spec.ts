import { ProdutividadeModule } from './produtividade.module';

describe('ProdutividadeModule', () => {
  let produtividadeModule: ProdutividadeModule;

  beforeEach(() => {
    produtividadeModule = new ProdutividadeModule();
  });

  it('should create an instance', () => {
    expect(produtividadeModule).toBeTruthy();
  });
});
