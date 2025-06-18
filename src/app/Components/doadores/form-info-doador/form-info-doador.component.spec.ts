import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInfoDoadorComponent } from './form-info-doador.component';

describe('FormInfoDoadorComponent', () => {
  let component: FormInfoDoadorComponent;
  let fixture: ComponentFixture<FormInfoDoadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInfoDoadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInfoDoadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
