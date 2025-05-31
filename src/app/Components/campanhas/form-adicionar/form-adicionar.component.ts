import { Component, EventEmitter, Output } from '@angular/core';
import { Campanha } from '../../../models/campanha.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CampanhaService } from '../../../services/campanha.service';

@Component({
  selector: 'app-form-adicionar',
  imports: [ReactiveFormsModule],
  templateUrl: './form-adicionar.component.html',
  styleUrl: './form-adicionar.component.css'
})
export class FormAdicionarComponent {

  // Construtor
  constructor(
    private authService: AuthService,
    private campanhaService: CampanhaService,
  ){ }

  // Importar o Evento de fechar o modal
    @Output() fechar = new EventEmitter<void>();

    fecharModal() {
      this.fechar.emit();
    };

    // Variáveis
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
      let novaCampanha = Object.assign(this.form_dados.value);
      if (this.form_dados.valid) {
        this.campanhaService.criarCampanha(novaCampanha);
        // this.corMensagem = "green";

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
