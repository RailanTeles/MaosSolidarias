import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private userURL = '';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": "tokenJWT" });

  constructor(
    private http: HttpClient, auth: AuthService) { 
      this.headers = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": ` Bearer ${auth.getToken()}` });
    }

}
