import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoggingService } from '../../services/logging.service';
import { CarregandoComponent } from '../carregando/carregando.component';

@Component({
  selector: 'app-campanhas',
  imports: [CarregandoComponent],
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
    private logging: LoggingService
  ){ }

  ngOnInit(): void{
    const interval = setInterval(() => {
      this.logging.checkLogin();
      if(this.authService.isLogged !== null){
        clearInterval(interval);
        this.isLoading = this.logging.isLoading;
        this.idUser = this.authService.getIdUser();
        this.typeUser = this.authService.getTypeUser();
      }
    }, 2);
  }
  
}
