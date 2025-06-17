import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class primeiroAcessoGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): Observable<boolean> {
    const token = this.authService.getToken();

    if (!token) {
      this.router.navigate(['/login']);
      return of(false);
    }

    return this.authService.getInfos(token).pipe(
      map((res) => {
        if (res.primeiroAcesso == 0) {
          return true;
        } else {
          this.router.navigate(['/perfil']);
          return false;
        }
      }),
      catchError((error) => {
        this.router.navigate(['/perfil']);
        return of(false);
      })
    );
  }
}
