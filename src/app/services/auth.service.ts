import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  idUser: number | null = null;
  typeUser: "ADMIN" | "DOADOR" | null = null;
  public isLogged: boolean = false;

  constructor() { 
    const token = localStorage.getItem('token');
    if (token) {
    // const decoded: any = jwtDecode(token);
    // login(decoded.id, decoded.tipo, token)
    this.isLogged = true; //Tirar isso depois, pois é redundante
    } else {
      this.isLogged = false;
    }
  }

  login( id: number, tipo: "ADMIN" | "DOADOR", token: string): void{
    this.idUser = id;
    this.typeUser = tipo;
    this.isLogged = true;
    localStorage.setItem('token', token);
  }

  logout(): void{
    this.idUser = null;
    this.isLogged = false;
    localStorage.removeItem('token');
  }

  getIdUser(): number | null {
    return this.idUser;
  }

  getTypeUser(): "ADMIN" | "DOADOR" | null{
    return this.typeUser;
  }
}
