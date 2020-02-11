import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribuicaoUFComponent } from './distribuicao-uf.component';

describe('DistribuicaoUFComponent', () => {
  let component: DistribuicaoUFComponent;
  let fixture: ComponentFixture<DistribuicaoUFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistribuicaoUFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistribuicaoUFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
