import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
constructor(private router: Router, private authService: AuthenticationService){}

  onLogoutClick(){
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
