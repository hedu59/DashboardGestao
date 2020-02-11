import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoneComponent } from './fone.component';

describe('FoneComponent', () => {
  let component: FoneComponent;
  let fixture: ComponentFixture<FoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
