import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteiraAtivaComponent } from './carteira-ativa.component';

describe('CarteiraAtivaComponent', () => {
  let component: CarteiraAtivaComponent;
  let fixture: ComponentFixture<CarteiraAtivaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarteiraAtivaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteiraAtivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
