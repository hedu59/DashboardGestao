import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailFichaComponent } from './email-ficha.component';

describe('EmailFichaComponent', () => {
  let component: EmailFichaComponent;
  let fixture: ComponentFixture<EmailFichaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailFichaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
