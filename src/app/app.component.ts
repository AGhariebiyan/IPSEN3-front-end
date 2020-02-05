import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private authService: AuthService;
  username = 'loading...';
  isLoggedIn: boolean;

  constructor(private auth: AuthService) {
    this.authService = auth;
    this.username = localStorage.getItem('username');
    this.auth.isLoggedIn().then((result: boolean) => this.isLoggedIn = result);
  }

  ngOnInit() {
    addEventListener('loginEvent', this.handleLoginChange);
  }

  handleLoginChange = () => {
    this.auth.isLoggedIn().then((result: boolean) => {
      this.isLoggedIn = result;
    });
    this.username = localStorage.getItem('username');
  }

  onLogout() {
    this.authService.logout();
  }
}
