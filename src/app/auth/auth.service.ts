import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user';
import { HttpClientService } from '../shared/http-client.service';

@Injectable()
export class AuthService {
  public loggedIn;

  constructor(
    private router: Router,
    private httpClientService: HttpClientService,
  ) {}

  login(user: User) {
    if (user.userName !== '' && user.password !== '' ) {
      this.httpClientService.onGet('http://localhost:8080/login/' + user.userName + '/' + user.password).pipe()
      .subscribe(
      data => {
        localStorage.setItem('jwtoken', data.authToken);
        localStorage.setItem('username', data.username);
        localStorage.setItem('userid', data.userId);

        this.loggedIn = true;
        dispatchEvent(new Event('loginEvent'));
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.log(error);
      });
    }
  }

  logout() {
    localStorage.clear();
    this.loggedIn = false;
    dispatchEvent(new Event('loginEvent'));
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return new Promise(
      (resolve, reject) => {
        resolve(this.loggedIn);
      }
    );
  }
}
