import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CampanhaService } from '../../services/campanha.service';
import { DoacaoService } from '../../services/doacao.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // Construtor
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  ngOnInit() {
    // this.authService.login('admin@unifan.br', '12345678').subscribe();
  }
}
