import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribuicaoFaixaComponent } from './distribuicao-faixa.component';

describe('DistribuicaoFaixaComponent', () => {
  let component: DistribuicaoFaixaComponent;
  let fixture: ComponentFixture<DistribuicaoFaixaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistribuicaoFaixaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistribuicaoFaixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
