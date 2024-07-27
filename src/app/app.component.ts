import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  showHeader: boolean = true;

  constructor(private router: Router) {}
  
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // List of routes where the header should be hidden
        const hideHeaderRoutes = ['/login'];
        this.showHeader = !hideHeaderRoutes.includes(event.urlAfterRedirects);
      }
    });
  }

  title = 'Sequenttal-Task';
}
