import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecoFichaComponent } from './endereco-ficha.component';

describe('EnderecoFichaComponent', () => {
  let component: EnderecoFichaComponent;
  let fixture: ComponentFixture<EnderecoFichaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnderecoFichaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnderecoFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
