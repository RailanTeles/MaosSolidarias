import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-alterar-senha',
  imports: [ReactiveFormsModule],
  templateUrl: './alterar-senha.component.html',
  styleUrl: './alterar-senha.component.css',
})
export class AlterarSenhaComponent {
  // Construtor
  constructor(private authService: AuthService) {}

  idUser!: number;
  mensagem: string | null = null;
  corMensagem: 'red' | 'green' | null = null;
  @Output() fechar = new EventEmitter<void>();

  fecharModal() {
    this.fechar.emit();
  }

  ngOnInit() {
    this.authService.getInfos(this.authService.getToken()).subscribe({
      next: (res) => {
        this.idUser = res.id;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // Formulário
  form_dados = new FormGroup({
    senhaAntiga: new FormControl('', Validators.required),
    senhaNova: new FormControl('', Validators.required),
  });

  AlterarSenha(e: SubmitEvent) {
    e.preventDefault();
    let dados = Object.assign(this.form_dados.value);
    console.log(dados);
    if (this.form_dados.valid) {
      if (this.idUser != null) {
        this.authService
          .alterarSenha(dados.senhaAntiga, dados.senhaNova)
          .subscribe({
            next: (res) => {
              this.corMensagem = 'green';
              this.mensagem = res.msg || 'Senha alterada com sucesso!';
              this.form_dados.reset();
            },
            error: (err) => {
              this.corMensagem = 'red';
              this.mensagem =
                err.error?.msg || 'Erro ao alterar a informações.';
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
      if (controls['senhaAntiga'].errors) this.mensagem += 'Senha antiga';
      if (controls['senhaNova'].errors) this.mensagem += ' e Senha nova';
    }
  }
}
