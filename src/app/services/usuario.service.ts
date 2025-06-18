// src/app/services/usuario.service.ts
import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly baseUrl = 'http://localhost:5000/api/v1';

  constructor(private http: HttpClient, private injector: Injector) {}

  private get headers(): HttpHeaders {
    const auth = this.injector.get(AuthService);
    const token = auth.getToken() ?? '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
  }

  // Cadastrar Admin
  cadastrarAdmin(admin: Usuario): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/admin`, admin, {
      headers: this.headers,
    });
  }

  // Cadastrar Doador
  cadastrarDoador(doador: Usuario): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/doador`, doador, {
      headers: this.headers,
    });
  }

  // Pegar todos os usuários
  obterUsuarios(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuario?pagina=${page}&itensPorPagina=4`, {
      headers: this.headers,
    });
  }
}
