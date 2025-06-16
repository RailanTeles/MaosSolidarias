import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditCampanhaComponent } from './form-edit-campanha.component';

describe('FormEditCampanhaComponent', () => {
  let component: FormEditCampanhaComponent;
  let fixture: ComponentFixture<FormEditCampanhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEditCampanhaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEditCampanhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
