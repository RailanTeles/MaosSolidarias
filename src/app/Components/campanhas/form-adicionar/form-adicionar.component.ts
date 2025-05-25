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
  // Importar o Evento de fechar o modal
    @Output() fechar = new EventEmitter<void>();

    fecharModal() {
      this.fechar.emit();
    };

    // Variáveis
    campanha : Campanha = {
      nome: '',
      descricao: '',
      metaArrecadacao: 0,
      dtInicio: new Date(),
      dtFim: new Date(),
      valorAtual: 0
    }

    mensagem: string | null = null;
    corMensagem: "red" | "green" | null = null;

    // Formulário
    form_dados = new FormGroup({
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      metaArrecadacao: new FormControl('', Validators.required),
      dtInicio: new FormControl('', Validators.required),
      dtFim: new FormControl('', Validators.required)
    });


    // Métodos
    SalvarCampanha(e: SubmitEvent) {
      e.preventDefault();
      this.mensagem = null;
      if (this.form_dados.valid) {
        this.corMensagem = "green";
        this.campanha = {
            nome: this.form_dados.value.nome!,
            descricao: this.form_dados.value.descricao!,
            metaArrecadacao: Number(this.form_dados.value.metaArrecadacao!),
            dtInicio: new Date(this.form_dados.value.dtInicio!),
            dtFim: new Date(this.form_dados.value.dtFim!), 
            valorAtual: 0
        };

      } else {
        this.corMensagem = "red";
        this.mensagem = "Erro! Os seguintes campos não foram preenchdidos: "
        const controls = this.form_dados.controls;
          if (controls.nome.errors) this.mensagem += '- Título\n';
          if (controls.descricao.errors) this.mensagem += '- Descrição\n';
          if (controls.metaArrecadacao.errors) this.mensagem += '- Meta de Arrecadação\n';
          if (controls.dtInicio.errors) this.mensagem += '- Data de Início\n';
          if (controls.dtFim.errors) this.mensagem += '- Data de Término\n';
      }
      
    }
}
