import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoggingService } from '../../services/logging.service';

@Component({
  selector: 'app-campanhas',
  imports: [],
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
  ){
    this.isLoading = this.logging.isLoading;
  }

  ngOnInit(): void{
    this.authService.login(1, 'admin', "fakeToken");
    this.logging.checkLogin();
    this.idUser = this.authService.getIdUser();
    this.typeUser = this.authService.getTypeUser();
  }
  
}
