import { Component, EventEmitter, Output } from '@angular/core';
import { Campanha } from '../../../models/campanha.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-adicionar',
  imports: [ReactiveFormsModule],
  templateUrl: './form-adicionar.component.html',
  styleUrl: './form-adicionar.component.css'
})
export class FormAdicionarComponent {
    @Output() fechar = new EventEmitter<void>();

    fecharModal() {
      this.fechar.emit();
    };

    form_dados = new FormGroup({
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      metaArrecadacao: new FormControl<number | null>(null, Validators.required),
      dtInicio: new FormControl(new Date("2000-01-01"), Validators.required),
      dtFim: new FormControl(new Date("2000-01-01"), Validators.required)
    });

    SalvarCampanha(e: SubmitEvent) {
      e.preventDefault();
      console.log(this.form_dados.controls.nome);
    };


}
