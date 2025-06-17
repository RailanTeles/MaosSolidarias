import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { CampanhaService } from '../../services/campanha.service';
import { DoacaoService } from '../../services/doacao.service';
import { Usuario } from '../../models/usuario.model';
import { FormDoadorComponent } from './form-doador/form-doador.component';
import { UsuarioService } from '../../services/usuario.service';
import { Route } from '@angular/router';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-doadores',
  imports: [NavbarComponent, FormDoadorComponent],
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
  }

  // Métodos
  FormDoador() {
    if (this.abrirFormDoador == false) {
      this.abrirFormDoador = true;
    } else {
      this.abrirFormDoador = false;
    }
  }

  FormInfo(idDoador?: number) {
    if (this.abrirInfoDoador == false) {
      this.abrirInfoDoador = true;
      this.doadorSelecionado = this.listaDoadores.find((c) => c.id == idDoador);
    } else {
      this.abrirInfoDoador = false;
      this.doadorSelecionado = null;
    }
  }

  atualizarDoadores(pagina: number) {
      // this.usuarioService.
  //   this.campanhaService.obterCampanhas(pagina).subscribe({
  //     next: (res) => {
  //       if (res.campanhas) {
  //         res.campanhas.forEach((campanha: any) => {
  //           campanha.dtInicio = campanha.dtInicio.substring(0, 10);
  //           campanha.dtFim = campanha.dtFim.substring(0, 10);
  //         });
  //       }

  //       this.listacampanhas = res.campanhas;
  //       // Pegar as doações
  //       res.campanhas.forEach((campanha: any) => {
  //         this.doacaoService.obterDoacoesId(campanha.id).subscribe({
  //           next: (res) => {
  //             let valorTotalDoado = 0;
  //             if (res.doacoes) {
  //               res.doacoes.forEach((doacao: any) => {
  //                 valorTotalDoado += doacao.valorDoado;
  //               });
  //             }
  //             const campanhaNaLista = this.listacampanhas.find(
  //               (c: Campanha) => c.id === campanha.id
  //             );

  //             if (campanhaNaLista) {
  //               campanhaNaLista.valorAtual = valorTotalDoado || 0;
  //             }
  //           },
  //           error: (err) => {
  //             console.log(err);
  //           },
  //         });
  //       });

  //       this.tamanhoCampanha = res.qtdPaginas;
  //       this.paginaSelecionada = pagina;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  }
}
