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
  campanhas : Array<Campanha> = [];
  
  // Métodos
  FormCampanha(){
    if(this.abrirFormCampanha == false){
      this.abrirFormCampanha = true;
    } else {
      this.abrirFormCampanha = false;
    }
  }
}
