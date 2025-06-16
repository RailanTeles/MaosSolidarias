import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Doacao } from '../models/doacao.model';

@Injectable({
  providedIn: 'root',
})
export class DoacaoService {
  private doacaoURL = 'http://localhost:5000/api/v1/doacao';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'tokenJWT',
  });

  constructor(private http: HttpClient, private auth: AuthService) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${auth.getToken()}`,
    });
  }

  // Listar Doações - Armengue
  obterDoacoesId(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.doacaoURL}/${id}?pagina=1&itensPorPagina=100`,
      { headers: this.headers }
    );
  }

  // Listar Doações - Armengue
  obterDoacoesIdUsavel(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.doacaoURL}/${id}?pagina=1&itensPorPagina=3`,
      { headers: this.headers }
    );
  }

  // Fazer Doação
  fazerDoacao(
    doacao: Doacao,
    idCampanha: number,
    idDoador: number
  ): Observable<any> {
    let doacaoJSON = JSON.stringify(doacao);
    return this.http.post<any>(
      `${this.doacaoURL}/${idCampanha}/${idDoador}`,
      doacaoJSON,
      { headers: this.headers }
    );
  }
}
