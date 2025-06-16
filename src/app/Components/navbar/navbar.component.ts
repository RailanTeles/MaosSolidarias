import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  typeUser!: string | null;

  ngOnInit(){
    this.authService.getInfos(this.authService.getToken()).subscribe({
      next: (res) =>{
        this.typeUser = res.tipo;
      }, 
      error: (err) =>{
        console.log(err);
      }
    })
  }
}
