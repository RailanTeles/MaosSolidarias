import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private idUser: number | null = null;
  private typeUser: "admin" | "doador" | null = null;
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

  login( id: number, tipo: "admin" | "doador", token: string): void{
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

  getTypeUser(): "admin" | "doador" | null{
    return this.typeUser;
  }
}
