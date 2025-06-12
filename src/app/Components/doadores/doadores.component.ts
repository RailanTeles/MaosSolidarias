import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-doadores',
  imports: [NavbarComponent],
  templateUrl: './doadores.component.html',
  styleUrl: './doadores.component.css'
})

export class DoadoresComponent {
  showModal = false; // Controla se o modal está visível

  // Outros códigos do componente...

  // Função chamada quando clica no botão Adicionar
  adicionarDoadores() {
    this.showModal = true; // Mostra o modal
  }

  // Função para fechar o modal
  onModalClose() {
    this.showModal = false; // Esconde o modal
  }
}
