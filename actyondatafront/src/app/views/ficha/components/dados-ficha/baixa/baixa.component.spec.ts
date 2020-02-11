import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaixaComponent } from './baixa.component';

describe('BaixaComponent', () => {
  let component: BaixaComponent;
  let fixture: ComponentFixture<BaixaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaixaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
