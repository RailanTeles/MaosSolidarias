import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormAdicionarComponent } from './form-adicionar/form-adicionar.component';
import { Campanha } from '../../models/campanha.model';
import { CampanhaService } from '../../services/campanha.service';
import { DoacaoService } from '../../services/doacao.service';

@Component({
  selector: 'app-campanhas',
  imports: [NavbarComponent, FormAdicionarComponent],
  templateUrl: './campanhas.component.html',
  styleUrl: './campanhas.component.css',
})
export class CampanhasComponent {
  // Construtor
  constructor(
    private authService: AuthService,
    private router: Router,
    private campanhaService: CampanhaService,
    private doacaoService: DoacaoService
  ) {}

  // Variaveis
  abrirFormCampanha: boolean = false;
  listacampanhas: Array<Campanha> = [];
  typeUser!: string | null;
  tamanhoCampanha: number = 0;
  paginaSelecionada: number = 1;

  ngOnInit() {
    this.authService.login('admin@unifan.br', '12345678').subscribe();
    // localStorage.setItem('tipo', 'normal');
    this.typeUser = localStorage.getItem('tipo');
    this.atualizarCampanhas(1);
  }

  // Métodos
  FormCampanha() {
    if (this.abrirFormCampanha == false) {
      this.abrirFormCampanha = true;
    } else {
      this.abrirFormCampanha = false;
    }
  }

  // Pegar as campanhas
  atualizarCampanhas(pagina: number) {
    if (this.typeUser == 'ADMIN') {
      this.campanhaService.obterCampanhas(pagina).subscribe({
        next: (res) => {
          if (res.campanhas) {
            res.campanhas.forEach((campanha: any) => {
              campanha.dtInicio = campanha.dtInicio.substring(0, 10);
              campanha.dtFim = campanha.dtFim.substring(0, 10);
            });
          }

          this.listacampanhas = res.campanhas;
          // Pegar as doações
          res.campanhas.forEach((campanha: any) => {
            this.doacaoService.obterDoacoesId(campanha.id).subscribe({
              next: (res) => {
                let valorTotalDoado = 0;
                if (res.doacoes) {
                  res.doacoes.forEach((doacao: any) => {
                    valorTotalDoado += doacao.valorDoado;
                  });
                }
                const campanhaNaLista = this.listacampanhas.find(
                  (c: Campanha) => c.id === campanha.id
                );

                if (campanhaNaLista) {
                  campanhaNaLista.valorAtual = valorTotalDoado || 0;
                }
              },
              error: (err) => {
                console.log(err);
              },
            });
          });

          this.tamanhoCampanha = res.qtdPaginas;
          this.paginaSelecionada = pagina;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else if (this.typeUser == 'DOADOR') {
      this.campanhaService.obterCampanhasAtivas(pagina).subscribe({
        next: (res) => {
          if (res.campanhasAtivas) {
            res.campanhasAtivas.forEach((campanha: any) => {
              campanha.dtInicio = campanha.dtInicio.substring(0, 10);
              campanha.dtFim = campanha.dtFim.substring(0, 10);
            });
          }

          this.listacampanhas = res.campanhasAtivas;
          // Pegar as doações
          res.campanhasAtivas.forEach((campanha: any) => {
            this.doacaoService.obterDoacoesId(campanha.id).subscribe({
              next: (res) => {
                let valorTotalDoado = 0;
                if (res.doacoes) {
                  res.doacoes.forEach((doacao: any) => {
                    valorTotalDoado += doacao.valorDoado;
                  });
                }
                const campanhaNaLista = this.listacampanhas.find(
                  (c: Campanha) => c.id === campanha.id
                );

                if (campanhaNaLista) {
                  campanhaNaLista.valorAtual = valorTotalDoado || 0;
                }
              },
              error: (err) => {
                console.log(err);
              },
            });
          });
          this.tamanhoCampanha = res.qtdPaginas;
          this.paginaSelecionada = pagina;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  // Largura da barra
  getBarWidth(campanha: Campanha): string {
  if (!campanha || !campanha.metaArrecadacao || !campanha.valorAtual) {
    return '0%';
  }

  const percent = (campanha.valorAtual / campanha.metaArrecadacao) * 100;

  // Limita a 100% para não estourar a barra
  return `${Math.min(percent, 100)}%`;
}
}
