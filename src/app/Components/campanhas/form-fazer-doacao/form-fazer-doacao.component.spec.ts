import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFazerDoacaoComponent } from './form-fazer-doacao.component';

describe('FormFazerDoacaoComponent', () => {
  let component: FormFazerDoacaoComponent;
  let fixture: ComponentFixture<FormFazerDoacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFazerDoacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFazerDoacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
