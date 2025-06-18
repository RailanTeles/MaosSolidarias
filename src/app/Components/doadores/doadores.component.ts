import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { FormDoadorComponent } from './form-doador/form-doador.component';
import { UsuarioService } from '../../services/usuario.service';
import { FormInfoDoadorComponent } from './form-info-doador/form-info-doador.component';

@Component({
  selector: 'app-doadores',
  imports: [NavbarComponent, FormDoadorComponent, FormInfoDoadorComponent],
  templateUrl: './doadores.component.html',
  styleUrl: './doadores.component.css',
})
export class DoadoresComponent {
  // Construtor
  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) {}

  // Variaveis
  abrirFormDoador: boolean = false;
  abrirInfoDoador: boolean = false;
  listaDoadores: Array<Usuario> = [];
  typeUser!: string | null;
  idUser!: number;
  tamanhoDoadores: number = 0;
  paginaSelecionada: number = 1;
  doadorSelecionado?: Usuario | null = null;

  ngOnInit() {
    this.authService.getInfos(this.authService.getToken()).subscribe({
      next: (res) => {
        this.typeUser = res.tipo;
        this.idUser = res.id;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.atualizarDoadores(1);
  }

  // Métodos
  FormDoador() {
    if (this.abrirFormDoador == false) {
      this.abrirFormDoador = true;
    } else {
      this.abrirFormDoador = false;
    }
  }

  // Pegar a Info do Doador
  FormInfo(idDoador?: number) {
    if (this.abrirInfoDoador == false) {
      this.abrirInfoDoador = true;
      this.doadorSelecionado = this.listaDoadores.find((c) => c.id == idDoador);
    } else {
      this.abrirInfoDoador = false;
      this.doadorSelecionado = null;
    }
  }

  // Pegar todos os doadores
  atualizarDoadores(pagina: number) {
    this.usuarioService.obterUsuarios(pagina).subscribe({
      next: (res) => {
        this.listaDoadores = res.usuarios;
        this.tamanhoDoadores = res.qtdPpaginas;
        this.paginaSelecionada = res.pagina;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
