import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Campanha } from '../models/campanha.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CampanhaService {
  private campanhaURL = 'http://localhost:5000/api/v1/campanha';
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

  // Criar uma campanha
  criarCampanha(campanha: Campanha): Observable<any> {
    let campanhaJSON = JSON.stringify(campanha);

    return this.http.post<any>(this.campanhaURL, campanhaJSON, {
      headers: this.headers,
    });
  }

  // Pegar todas as campanhas
  obterCampanhas(pagina: number): Observable<any> {
    return this.http.get<any>(
      `${this.campanhaURL}?pagina=${pagina}&itensPorPagina=2`,
      { headers: this.headers }
    );
  }

  // Pegar campanhas ativas
  obterCampanhasAtivas(pagina: number): Observable<any> {
    return this.http.get<any>(
      `${this.campanhaURL}/ativas?pagina=${pagina}&itensPorPagina=2`,
      { headers: this.headers }
    );
  }
}
