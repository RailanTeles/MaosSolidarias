import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  isLoading: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  checkLogin(): void {
    if (this.authService.isLogged == false) {
      this.router.navigate(['login']);
    } 

    if(this.authService.isLogged == true){
      this.isLoading = false;
    }
  }
}
