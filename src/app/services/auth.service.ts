import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged: boolean = false;

  constructor( private http: HttpClient) { 
    const token = localStorage.getItem('token');
    if (token) {
    this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  login(email: string, senha : string | null | undefined) : Observable<any>{
      return this.http.post<any>(
        'http://localhost:5000/api/v1/usuario/logar', 
        {email, senha}
      ).pipe(
            map(data => {
            localStorage.setItem('token', data.token_jwt);
            localStorage.setItem('tipo', data.usuario.tipo);
            return data;
          }), 
          catchError(error => {
            console.error('Houve um erro:', error);
            return throwError(() => error);
          })
      );
    }

  logout(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('tipo');
  }

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }
}
