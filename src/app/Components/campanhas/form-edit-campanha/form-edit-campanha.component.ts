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
import { Doacao } from '../../../models/doacao.model';

@Component({
  selector: 'app-form-edit-campanha',
  imports: [ReactiveFormsModule],
  templateUrl: './form-edit-campanha.component.html',
  styleUrl: './form-edit-campanha.component.css',
})
export class FormEditCampanhaComponent {
  // Construtor
  constructor(
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
  listaDoacoes: Array<Doacao> = [];
  tamanhoDoacoes: number = 0;
  paginaSelecionada: number = 1;
  idCampanha!: number;

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
      if (this.campanha?.id !== undefined) {
        this.obterDoacoes(this.campanha.id, 1);
        this.idCampanha = this.campanha?.id;
      }
    }
  }

  SalvarAlteracoes(e: SubmitEvent) {
    e.preventDefault();
    this.mensagem = null;
    let campanha = Object.assign(this.form_dados.value);

    const formatarData = (data: string | null) => {
      if (!data) return '';
      const [ano, mes, dia] = data.split('-');
      return `${dia}/${mes}/${ano}`;
    };

    campanha.dtInicio = formatarData(campanha.dtInicio);
    campanha.dtFim = formatarData(campanha.dtFim);

    if (this.form_dados.valid) {
      if (this.campanha?.id != null) {
        this.campanhaService
          .atualizarCampanha(this.campanha.id, campanha)
          .subscribe({
            next: (res) => {
              this.corMensagem = 'green';
              this.mensagem = res.msg || 'Campanha editada com sucesso!';
              this.form_dados.reset();
            },
            error: (err) => {
              this.corMensagem = 'red';
              this.mensagem = err.error?.msg || 'Erro ao editar a campanha.';
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

  excluirCampanha() {
    this.mensagem = null;
    if (this.form_dados.valid) {
      if (this.campanha?.id != null) {
        this.campanhaService.removerCampanha(this.campanha.id).subscribe({
          next: (res) => {
            this.corMensagem = 'green';
            this.mensagem = 'Campanha excluida com sucesso';
            this.form_dados.reset();
          },
          error: (err) => {
            this.corMensagem = 'red';
            this.mensagem = err.error?.msg || 'Erro ao excluir a campanha.';
            console.error('Erro na API:', err);
          },
        });
      }
    } else {
      this.mensagem = 'Sem id!';
    }
  }

  obterDoacoes(idCampanha: number, page: number) {
    this.doacaoService.obterDoacoesIdUsavel(idCampanha, page).subscribe({
      next: (res) => {
        this.listaDoacoes = res.doacoes;
        this.tamanhoDoacoes = res.qtdPaginas;
        this.paginaSelecionada = page;
      },
      error: (err) => {
        console.error('Erro na API:', err);
      },
    });
  }
}
