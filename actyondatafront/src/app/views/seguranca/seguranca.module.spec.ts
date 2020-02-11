import { SegurancaModule } from './seguranca.module';

describe('SegurancaModule', () => {
  let segurancaModule: SegurancaModule;

  beforeEach(() => {
    segurancaModule = new SegurancaModule();
  });

  it('should create an instance', () => {
    expect(segurancaModule).toBeTruthy();
  });
});
