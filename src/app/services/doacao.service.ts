import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

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

  // Listar Doações
  obterDoacoesId(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.doacaoURL}/${id}?pagina=1&itensPorPagina=100`,
      { "headers": this.headers }
    );
  }
}
