import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-doadores',
  imports: [NavbarComponent],
  templateUrl: './doadores.component.html',
  styleUrl: './doadores.component.css'
})
export class DoadoresComponent {

  typeUser!: string | null;

  ngOnInit(){
    this.typeUser = localStorage.getItem('tipo');
  }

}
