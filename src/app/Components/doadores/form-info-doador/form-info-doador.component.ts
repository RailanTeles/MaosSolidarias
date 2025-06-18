import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-form-info-doador',
  imports: [ReactiveFormsModule],
  templateUrl: './form-info-doador.component.html',
  styleUrl: './form-info-doador.component.css',
})
export class FormInfoDoadorComponent {
  // Construtor
  constructor(private serviceUsuario: UsuarioService) {}

  // Variáveis
  @Input() doador?: Usuario | null;
  @Output() fechar = new EventEmitter<void>();
  @Output() atualizar = new EventEmitter<void>();

  fecharModal() {
    this.fechar.emit();
    this.atualizar.emit();
  }

  mensagem: string | null = null;
  corMensagem: 'red' | 'green' | null = null;
  form_dados!: FormGroup;

  ngOnChanges() {
    if (this.doador) {
      this.form_dados = new FormGroup({
        nome: new FormControl(this.doador.nome, Validators.required),
        telefone: new FormControl(this.doador.telefone, Validators.required),
        email: new FormControl(this.doador.email, [
          Validators.required,
          Validators.email,
        ]),
        senha: new FormControl('', Validators.required),
      });
    }
  }

  // Alterar Informações
  AlterarInformacoes(e: SubmitEvent) {
    e.preventDefault();
    this.atualizar.emit();
    this.mensagem = null;
    let doador = Object.assign(this.form_dados.value);
    if (this.form_dados.valid && this.doador) {
      this.serviceUsuario.alterarDados(this.doador.id, doador).subscribe({
        next: (res) => {
          this.corMensagem = 'green';
          this.mensagem = res.msg || 'Dados alterados com sucesso!';
          window.location.reload();
        },
        error: (err) => {
          this.corMensagem = 'red';
          this.mensagem = err.error?.msg || 'Erro ao alterar dados.';
          console.error('Erro na API:', err);
        },
      });
    } else {
      this.corMensagem = 'red';
      this.mensagem = 'Erro! Os seguintes campos não foram preenchidos: <br>';
      const controls = this.form_dados.controls;
      if (controls['nome'].errors) this.mensagem += 'Nome,';
      if (controls['email'].errors) this.mensagem += ' Email, ';
      if (controls['telefone'].errors) this.mensagem += 'Telefone, ';
      if (controls['senha'].errors) this.mensagem += 'Senha';
    }
  }

  // Excluir Daodor
  excluirDoador() {
    this.mensagem = null;
    if (this.doador) {
      this.serviceUsuario.excluirDoador(this.doador.id).subscribe({
        next: (res) => {
          this.corMensagem = 'green';
          this.mensagem = res.msg || 'Usuário excluído com sucess!';
          window.location.reload();
        }, error: (err) =>{
          this.corMensagem = 'red';
          this.mensagem = err.error?.msg || 'Erro ao alterar dados.';
          console.error('Erro na API:', err);
        }
      });
    }
  }
}
