import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Campanha } from '../models/campanha.model';

@Injectable({
  providedIn: 'root'
})
export class CampanhaService {

  private campanhaURL = 'http://localhost:5000/api/v1/campanha';
  private headers = new HttpHeaders({ "Authorization": "tokenJWT" });

  constructor(
    private http: HttpClient, auth: AuthService) { 
      this.headers = new HttpHeaders({ "Authorization": auth.getToken() });
    }

  // Adicionar uma Campanha
  criarCampanha(campanha : Campanha){
    // let campanhaJson = JSON.stringify(campanha);
    this.http.post<any>(`${this.campanhaURL}`, campanha, {
      "headers" :
      this.headers
    }).subscribe({
      next: data => {
        return data;
      },
      error: error =>{
        console.log("Houve um erro:", error);
      }
    })
  }
}
