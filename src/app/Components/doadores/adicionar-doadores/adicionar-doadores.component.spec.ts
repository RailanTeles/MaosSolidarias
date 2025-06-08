import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarDoadoresComponent } from './adicionar-doadores.component';

describe('AdicionarDoadoresComponent', () => {
  let component: AdicionarDoadoresComponent;
  let fixture: ComponentFixture<AdicionarDoadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarDoadoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarDoadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
