import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaCobrancaComponent } from './ficha-cobranca.component';

describe('FichaCobrancaComponent', () => {
  let component: FichaCobrancaComponent;
  let fixture: ComponentFixture<FichaCobrancaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaCobrancaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaCobrancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
