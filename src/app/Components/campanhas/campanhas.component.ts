import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormAdicionarComponent } from './form-adicionar/form-adicionar.component';

@Component({
  selector: 'app-campanhas',
  imports: [NavbarComponent, FormAdicionarComponent],
  templateUrl: './campanhas.component.html',
  styleUrl: './campanhas.component.css'
})
export class CampanhasComponent{
  isLoading: boolean = true;
  idUser!: number | null;
  typeUser!: "admin" | "doador" | null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ){ }

  abrirFormCampanha: boolean = false;
  
  FormCampanha(){
    if(this.abrirFormCampanha == false){
      this.abrirFormCampanha = true;
    } else {
      this.abrirFormCampanha = false;
    }
  }
}
