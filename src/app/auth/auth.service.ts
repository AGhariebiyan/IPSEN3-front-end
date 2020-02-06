import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AuthService {
  private httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json'
  });
  private urlStart = 'http://localhost:8080';

  constructor(private router: Router, private http: HttpClient) {
    if (localStorage.getItem('jwtoken') !== null && this.httpHeaders.get('Token') === null) {
      this.httpHeaders = this.httpHeaders.append('Token', localStorage.getItem('jwtoken'));
    }
  }

  login(user: User) {
    if (user.userName !== '' && user.password !== '') {
      const userToBeLoggedIn = {
        username: user.userName,
        password: user.password
      };

      this.http.post<any>(this.urlStart + '/auth/login', userToBeLoggedIn, {headers: this.httpHeaders}).subscribe(
        data => {
          localStorage.setItem('jwtoken', data.authToken);
          localStorage.setItem('username', data.username);
          localStorage.setItem('userid', data.userId);
          localStorage.setItem('loggedIn', 'true');

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
    localStorage.setItem('loggedIn', 'false');
    dispatchEvent(new Event('loginEvent'));
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return new Promise(
      (resolve) => {
        if (localStorage.getItem('loggedIn') === 'true') {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    );
  }
}
