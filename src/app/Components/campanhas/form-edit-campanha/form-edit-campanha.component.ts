import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CampanhaService } from '../../../services/campanha.service';
import { DoacaoService } from '../../../services/doacao.service';
import { Campanha } from '../../../models/campanha.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form-edit-campanha',
  imports: [ReactiveFormsModule],
  templateUrl: './form-edit-campanha.component.html',
  styleUrl: './form-edit-campanha.component.css',
})
export class FormEditCampanhaComponent {
  // Construtor
  constructor(
    private authService: AuthService,
    private campanhaService: CampanhaService,
    private doacaoService: DoacaoService
  ) {}

  // Variáveis
  @Input() campanha?: Campanha | null;
  @Output() fechar = new EventEmitter<void>();
  @Output() atualizar = new EventEmitter<void>();

  fecharModal() {
    this.fechar.emit();
    this.atualizar.emit();
  }

  // Variáveis
  mensagem: string | null = null;
  corMensagem: 'red' | 'green' | null = null;
  form_dados!: FormGroup;

  ngOnChanges() {
    if (this.campanha) {
      this.form_dados = new FormGroup({
        nome: new FormControl(this.campanha.nome, Validators.required),
        descricao: new FormControl(
          this.campanha.descricao,
          Validators.required
        ),
        metaArrecadacao: new FormControl(
          this.campanha.metaArrecadacao,
          Validators.required
        ),
        dtInicio: new FormControl(this.campanha.dtInicio, Validators.required),
        dtFim: new FormControl(this.campanha.dtFim, Validators.required),
      });
    }
  }

  SalvarAlteracoes(e: SubmitEvent) {
    e.preventDefault();
    this.mensagem = null;
    this.mensagem = null;
    let campanha = Object.assign(this.form_dados.value);

    const formatarData = (data: string | null) => {
      if (!data) return '';
      const [ano, mes, dia] = data.split('-'); 
      return `${dia}/${mes}/${ano}`;
    };

    campanha.dtInicio = formatarData(campanha.dtInicio);
    campanha.dtFim = formatarData(campanha.dtFim);
    console.log(campanha.dtFim);

    if (this.form_dados.valid) {
      if (this.campanha?.id != null) {
        this.campanhaService
          .atualizarCampanha(this.campanha.id, campanha)
          .subscribe({
            next: (res) => {
              this.corMensagem = 'green';
              this.mensagem = res.msg || 'Doação feita com sucesso!';
              this.form_dados.reset();
            },
            error: (err) => {
              this.corMensagem = 'red';
              this.mensagem = err.error?.msg || 'Erro ao fazer a doação.';
              console.error('Erro na API:', err);
            },
          });
      } else {
        this.mensagem = 'Sem id!';
      }
    } else {
      this.corMensagem = 'red';
      this.mensagem = 'Erro! Os seguintes campos não foram preenchidos: <br>';
      const controls = this.form_dados.controls;
      if (controls['nome'].errors) this.mensagem += 'Título,';
      if (controls['descricao'].errors) this.mensagem += 'Descrição,';
      if (controls['metaArrecadacao'].errors)
        this.mensagem += 'Meta de Arrecadação,';
      if (controls['dtInicio'].errors) this.mensagem += 'Data de Início,';
      if (controls['dtFim'].errors) this.mensagem += 'Data de Término';
    }
  }
}
