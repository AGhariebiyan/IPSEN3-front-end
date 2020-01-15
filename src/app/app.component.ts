import { Component } from '@angular/core';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IPSEN3-front-end';
  private authService: AuthService;

  constructor(private auth: AuthService) {
    this.authService = auth;
  }

  onLogout() {
    this.authService.logout();
  }
}
