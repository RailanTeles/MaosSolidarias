import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // Construtor
  constructor(private authService: AuthService, private router: Router) {}

  // Variáveis
  mensagem: string | null = null;
  corMensagem: 'red' | 'green' | null = null;

  ngOnInit() {
    // this.authService.login('admin@unifan.br', '12345678').subscribe();
  }

  // Formulário
  form_dados = new FormGroup({
    email: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required),
  });

  // Logar
  Logar(e: SubmitEvent) {
    e.preventDefault();
    let dadosLogin = Object.assign(this.form_dados.value);

    if (this.form_dados.valid) {
      this.authService.login(dadosLogin.email, dadosLogin.senha).subscribe({
        next: (res) => {
          this.corMensagem = 'green';
          this.mensagem = res.msg || 'Login feito com sucesso!';
          this.form_dados.reset();
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.corMensagem = 'red';
          this.mensagem = err.error?.msg || 'Erro ao logar.';
          console.error('Erro na API:', err);
        },
      });
    } else {
      this.corMensagem = 'red';
      this.mensagem = 'Erro! Os seguintes campos não foram preenchidos: <br>';
      const controls = this.form_dados.controls;
      if (controls.email.errors) this.mensagem += '- Email <br>';
      if (controls.senha.errors) this.mensagem += '- Senha <br>';
    }
  }
}
