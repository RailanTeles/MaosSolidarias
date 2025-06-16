import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLogged: boolean = false;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'tokenJWT',
  });

  constructor(private http: HttpClient) {}

  login(email: string, senha: string | null | undefined): Observable<any> {
    return this.http
      .post<any>('http://localhost:5000/api/v1/usuario/logar', { email, senha })
      .pipe(
        map((data) => {
          localStorage.setItem('token', data.token_jwt);
          return data;
        }),
        catchError((error) => {
          console.error('Houve um erro:', error);
          return throwError(() => error);
        })
      );
  }

  getInfos(token: string): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/v1/usuario/porToken', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
  }

  alterarDados(usuario: Usuario): Observable<any> {
    let usuarioJSON = JSON.stringify(usuario);
    return this.http.put<any>(
      `http://localhost:5000/api/v1/usuario/1`,
      usuarioJSON,
      { headers: this.headers }
    );
  }

  alterarSenha(senhaAntiga: string, senhaNova: string): Observable<any> {
    return this.http.put<any>(
      `http://localhost:5000/api/v1/usuario/senha`,
      { senha: senhaAntiga, novaSenha: senhaNova },
      { headers: this.headers }
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('tipo');
  }

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }
}
