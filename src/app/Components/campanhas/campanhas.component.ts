import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
  ){ }
  
}
