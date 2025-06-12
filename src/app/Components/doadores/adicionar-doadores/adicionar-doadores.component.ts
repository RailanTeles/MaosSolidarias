import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FormAdicionarComponent } from '../../campanhas/form-adicionar/form-adicionar.component';
import { AuthService } from '../../../services/auth.service';
import { Router } from 'express';
import { CampanhaService } from '../../../services/campanha.service';
import { DoadoresComponent } from '../doadores.component';

@Component({
  selector: 'app-adicionar-doadores',
  imports: [NavbarComponent, FormAdicionarComponent],
  templateUrl: './adicionar-doadores.component.html',
  styleUrl: './adicionar-doadores.component.css'
})
export class AdicionarDoadoresComponent {
    // Construtor
  constructor(
    private authService: AuthService,
    private router: Router,
    private campanhaService: CampanhaService,
  ){ }

  // Variaveis
  abrirFormadicionar: boolean = false;
  listaDoadores : Array<DoadoresComponent> = []
  typeUser!: string | null;

  ngOnInit(){
    // localStorage.setItem('tipo', 'normal');
    this.typeUser = localStorage.getItem('tipo');
    this.authService.login("admin@unifan.br", "12345678").subscribe();
  }


}



