import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoneFichaComponent } from './fone-ficha.component';

describe('FoneFichaComponent', () => {
  let component: FoneFichaComponent;
  let fixture: ComponentFixture<FoneFichaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoneFichaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoneFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
