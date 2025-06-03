import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormAdicionarComponent } from './form-adicionar/form-adicionar.component';
import { Campanha } from '../../models/campanha.model';
import { CampanhaService } from '../../services/campanha.service';

@Component({
  selector: 'app-campanhas',
  imports: [NavbarComponent, FormAdicionarComponent],
  templateUrl: './campanhas.component.html',
  styleUrl: './campanhas.component.css'
})
export class CampanhasComponent{
  // Construtor
  constructor(
    private authService: AuthService,
    private router: Router,
    private campanhaService: CampanhaService, 
  ){ }

  // Variaveis
  abrirFormCampanha: boolean = false;
  listacampanhas : Array<Campanha> = [];
  typeUser!: string | null; 
  tamanhoCampanha: number = 0;
  paginaSelecionada: number = 1;

  ngOnInit(){
    this.typeUser = localStorage.getItem('tipo');
    this.atualizarCampanhas(1);
    this.authService.login("admin@unifan.br", "12345678").subscribe();
  }
  
  // Métodos
  FormCampanha(){
    if(this.abrirFormCampanha == false){
      this.abrirFormCampanha = true;
    } else {
      this.abrirFormCampanha = false;
    }
  }

  // Pegar as campanhas
  atualizarCampanhas(pagina : number){
    this.campanhaService.obterCampanhas(pagina).subscribe(
      {
        next:(res) =>{
            res.campanhas.forEach((campanha: any) => {
              campanha.dtInicio = campanha.dtInicio.substring(0, 10);
              campanha.dtFim = campanha.dtFim.substring(0, 10);
            });

            // Fazer um para pegar as doações
            this.listacampanhas = res.campanhas;
            this.tamanhoCampanha = Math.ceil(res.total / 2);
            this.paginaSelecionada = pagina;
        },
        error: (err) =>{
          console.log(err);
        }
      }
    )
  }

  // Largura da barra
  getBarWidth(campanha: Campanha): string {
    if (!campanha || !campanha.metaArrecadacao || campanha.metaArrecadacao === 0) return '0%';
    const percent = (campanha.metaArrecadacao ?? 0) / campanha.metaArrecadacao * 100;
    return `${percent}%`;
  }
}
