import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
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
  selector: 'app-form-fazer-doacao',
  imports: [ReactiveFormsModule],
  templateUrl: './form-fazer-doacao.component.html',
  styleUrl: './form-fazer-doacao.component.css',
})
export class FormFazerDoacaoComponent {
  // Construtor
  constructor(
    private authService: AuthService,
    private router: Router,
    private campanhaService: CampanhaService,
    private doacaoService: DoacaoService
  ) {}

  // Variáveis
  @Input() idUser!: number;
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

  // Formulário
  form_dados = new FormGroup({
    valorDoado: new FormControl('', Validators.required),
    nomeCartao: new FormControl('', Validators.required),
    numeroCartao: new FormControl('', Validators.required),
    dtValidadeCartao: new FormControl('', Validators.required),
    codigoSegurancaCartao: new FormControl('', Validators.required),
  });

  // Fazer Pagamento
  EfetuarPagamento(e: SubmitEvent) {
    e.preventDefault();
    this.mensagem = null;
    let novaDoacao = Object.assign(this.form_dados.value);

    const formatarData = (data: string | null) => {
      if (!data) return '';
      const d = new Date(data);
      const dia = String(d.getDate()).padStart(2, '0');
      const mes = String(d.getMonth() + 1).padStart(2, '0');
      const ano = d.getFullYear();
      return `${dia}/${mes}/${ano}`;
    };

    novaDoacao = {
      numeroCartao: String(novaDoacao.numeroCartao),
      nomeCartao: String(novaDoacao.nomeCartao),
      dtValidadeCartao: formatarData(novaDoacao.dtValidadeCartao),
      codigoSegurancaCartao: String(novaDoacao.codigoSegurancaCartao),
      valorDoado: String(novaDoacao.valorDoado),
    };

    if (this.form_dados.valid) {
      if (this.campanha?.id != null) {
        this.doacaoService
          .fazerDoacao(novaDoacao, this.campanha?.id, this.idUser)
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
      this.mensagem = 'Erro! Os seguintes campos não foram preenchdidos: ';
      const controls = this.form_dados.controls;
      if (controls.valorDoado.errors) this.mensagem += '- Valor Doado\n';
      if (controls.nomeCartao.errors) this.mensagem += '- Nome do Cartão\n';
      if (controls.numeroCartao.errors) this.mensagem += '- Número do Cartão\n';
      if (controls.dtValidadeCartao.errors)
        this.mensagem += '- Data da Validade do Cartão\n';
      if (controls.codigoSegurancaCartao.errors)
        this.mensagem += '- Código de Segurança\n';
    }
  }
}
