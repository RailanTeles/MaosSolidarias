import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormAdicionarComponent } from './form-adicionar/form-adicionar.component';
import { Campanha } from '../../models/campanha.model';
import { CampanhaService } from '../../services/campanha.service';
import { DoacaoService } from '../../services/doacao.service';
import { FormFazerDoacaoComponent } from './form-fazer-doacao/form-fazer-doacao.component';
import { FormEditCampanhaComponent } from './form-edit-campanha/form-edit-campanha.component';

@Component({
  selector: 'app-campanhas',
  imports: [
    NavbarComponent,
    FormAdicionarComponent,
    FormFazerDoacaoComponent,
    FormEditCampanhaComponent,
  ],
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
  abrirFormDoacao: boolean = false;
  abrirFormEdit: boolean = false;
  listacampanhas: Array<Campanha> = [];
  typeUser!: string | null;
  idUser!: number;
  tamanhoCampanha: number = 0;
  paginaSelecionada: number = 1;
  campanhaSelecionada?: Campanha | null = null;

  ngOnInit() {
    this.authService.getInfos(this.authService.getToken()).subscribe({
      next: (res) => {
        this.typeUser = res.tipo;
        this.idUser = res.id;
        this.atualizarCampanhas(1);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // Métodos
  // Adicionar uma Campanha
  FormCampanha() {
    if (this.abrirFormCampanha == false) {
      this.abrirFormCampanha = true;
    } else {
      this.abrirFormCampanha = false;
    }
  }

  // Fazer uma Doação
  FormDoacao(idCampanha?: number) {
    if (this.abrirFormDoacao == false) {
      this.abrirFormDoacao = true;
      this.campanhaSelecionada = this.listacampanhas.find(
        (c) => c.id == idCampanha
      );
    } else {
      this.abrirFormDoacao = false;
      this.campanhaSelecionada = null;
    }
  }

  // Editar uma Campanha
  FormEditar(idCampanha?: number) {
    if (this.abrirFormEdit == false) {
      this.abrirFormEdit = true;
      this.campanhaSelecionada = this.listacampanhas.find(
        (c) => c.id == idCampanha
      );
    } else {
      this.abrirFormEdit = false;
      this.campanhaSelecionada = null;
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
          console.log(res.campanhas);
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
    if (!campanha || !campanha.metaArrecadacao || !campanha.valorArrecadado) {
      return '0%';
    }

    const percent = (campanha.valorArrecadado / campanha.metaArrecadacao) * 100;

    // Limita a 100% para não estourar a barra
    return `${Math.min(percent, 100)}%`;
  }
}
