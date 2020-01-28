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

  constructor(private auth: AuthService) {
    this.authService = auth;
    this.username = localStorage.getItem('username');
  }

  ngOnInit() {
    addEventListener('usernameChange', this.handleStorageChange);
  }

  handleStorageChange = () => {
    this.username = localStorage.getItem('username');
  }

  onLogout() {
    this.authService.logout();
  }
}
