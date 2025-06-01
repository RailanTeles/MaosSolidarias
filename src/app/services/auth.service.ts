import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  id: number;
  email: string;
  tipo: 'ADMIN' | 'DOADOR';
  exp: number;
}
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
            localStorage.setItem('tipo', data.usuario.tipo)
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
  }


  getIdUser(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode<TokenPayload>(token);
      console.log(decoded.id, decoded.tipo);
      return 1
    }
    return 2
  }

  // getTypeUser(): "ADMIN" | "DOADOR" | null{
  //   return this.typeUser;
  // }

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }
}
