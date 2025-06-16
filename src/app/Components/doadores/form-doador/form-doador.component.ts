import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-form-doador',
  imports: [ReactiveFormsModule],
  templateUrl: './form-doador.component.html',
  styleUrl: './form-doador.component.css',
})
export class FormDoadorComponent {
  constructor(private usuarioService: UsuarioService) {}

  // Importar o Evento de fechar o modal
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
    cpf: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    nome: new FormControl('', Validators.required),
    telefone: new FormControl('', Validators.required),
    tipo: new FormControl('DOADOR', Validators.required),
  });

  // Métodos
  SalvarUsuario(e: SubmitEvent) {
    e.preventDefault();
    this.atualizar.emit();
    this.mensagem = null;
    let novoUser = Object.assign(this.form_dados.value);
    let type = novoUser.tipo;
    novoUser.senha = '12345678';
    delete novoUser.tipo;
    console.log(novoUser);

    if (this.form_dados.valid) {
      if (type == 'ADMIN') {
        this.usuarioService.cadastrarAdmin(novoUser).subscribe({
          next: (res) => {
            this.corMensagem = 'green';
            this.mensagem = res.msg || 'Campanha criada com sucesso!';
            this.form_dados.reset();
          },
          error: (err) => {
            this.corMensagem = 'red';
            this.mensagem = err.error?.msg || 'Erro ao salvar campanha.';
            console.error('Erro na API:', err);
          },
        });
      } else if (type == 'DOADOR') {
        this.usuarioService.cadastrarDoador(novoUser).subscribe({
          next: (res) => {
            this.corMensagem = 'green';
            this.mensagem = res.msg || 'Campanha criada com sucesso!';
            this.form_dados.reset();
          },
          error: (err) => {
            this.corMensagem = 'red';
            this.mensagem = err.error?.msg || 'Erro ao salvar campanha.';
            console.error('Erro na API:', err);
          },
        });
      } else {
        this.mensagem = 'Sem tipo de usuário';
      }
    } else {
      this.corMensagem = 'red';
      this.mensagem = 'Erro! Os seguintes campos não foram preenchdidos: <br>';
      const controls = this.form_dados.controls;
      if (controls.cpf.errors) this.mensagem += 'Cpf - ';
      if (controls.email.errors) this.mensagem += 'Email - ';
      if (controls.nome.errors) this.mensagem += 'Nome - ';
      if (controls.telefone.errors) this.mensagem += 'Telefone';
    }
  }
}
