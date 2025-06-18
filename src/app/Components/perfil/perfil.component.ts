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
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';

@Component({
  selector: 'app-perfil',
  imports: [NavbarComponent, ReactiveFormsModule, AlterarSenhaComponent],
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
      
        if(res.primeiroAcesso == 1){
          alert("Para conectar normalmente, altere sua senha");
        }

        this.form_dados = new FormGroup({
          nome: new FormControl(this.user.nome, Validators.required),
          email: new FormControl(this.user.email, [Validators.required, Validators.email]),
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

  FormSenha(){
    if(this.abrirFormSenha == false){
      this.abrirFormSenha = true;
    } else {
      this.abrirFormSenha = false;
    }
  }

  SalvarAlteracoes(e: SubmitEvent) {
    e.preventDefault();
    let usuario = Object.assign(this.form_dados.value);
    if (this.form_dados.valid) {
      this.authService.alterarDados(usuario).subscribe({
        next: (res) => {
          this.corMensagem = 'green';
          this.mensagem = res.msg || 'Informações editadas com sucesso!';
          window.location.reload();
        },
        error: (err) => {
          this.corMensagem = 'red';
          this.mensagem = err.error?.msg || 'Erro ao editar as informações.';
          console.error('Erro na API:', err);
        },
      });
    } else {
      this.corMensagem = 'red';
      this.mensagem = 'Erro! Os seguintes campos não foram preenchidos: <br>';
      const controls = this.form_dados.controls;
      if (controls['nome'].errors) this.mensagem += 'Nome,';
      if (controls['email'].errors) this.mensagem += ' Email, ';
      if (controls['telefone'].errors) this.mensagem += 'Telefone';
    }
  }
}
