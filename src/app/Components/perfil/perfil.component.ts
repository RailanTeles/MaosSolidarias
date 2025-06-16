import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-perfil',
  imports: [NavbarComponent, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  // Construtor
  constructor(private authService: AuthService, private router: Router) {}

  // Variáveis
  abrirFormSenha: boolean = false;
  idUser!: number;
  user!: Usuario;
  form_dados!: FormGroup;
  mensagem: string | null = null;
  corMensagem: 'red' | 'green' | null = null;

  ngOnInit() {
    this.authService.getInfos(this.authService.getToken()).subscribe({
      next: (res) => {
        this.user = res;
        this.idUser = res.id;

        this.form_dados = new FormGroup({
          nome: new FormControl(this.user.nome, Validators.required),
          email: new FormControl(this.user.email, Validators.required),
          telefone: new FormControl(this.user.telefone, Validators.required),
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // Métodos
  Deslogar() {
    this.authService.logout();
    window.location.reload();
  }

  SalvarAlteracoes(e: SubmitEvent) {
    e.preventDefault();
    let usuario = Object.assign(this.form_dados.value);
    this.authService.alterarDados(usuario).subscribe({
      next: (res) => {
        this.corMensagem = 'green';
        this.mensagem = res.msg || 'Informações editadas com sucesso!';
        this.form_dados.reset();
      },
      error: (err) => {
        this.corMensagem = 'red';
        this.mensagem = err.error?.msg || 'Erro ao editar as informações.';
        console.error('Erro na API:', err);
      },
    });
  }
}
