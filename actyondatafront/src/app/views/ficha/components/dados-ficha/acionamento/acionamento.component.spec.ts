import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcionamentoComponent } from './acionamento.component';

describe('AcionamentoComponent', () => {
  let component: AcionamentoComponent;
  let fixture: ComponentFixture<AcionamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcionamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcionamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
