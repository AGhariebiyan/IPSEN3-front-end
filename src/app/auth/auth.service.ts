import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user';
import { HttpClientService } from '../shared/http-client.service';

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private httpClientService: HttpClientService,
  ) {}

  login(user: User) {
    if (user.userName !== '' && user.password !== '') {
      const userToBeLoggedIn = { 
        userName: user.userName, 
        password: user.password 
     };

      this.httpClientService.post('/login', userToBeLoggedIn).pipe()
      .subscribe(
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
      (resolve, reject) =>{
        if (localStorage.getItem('loggedIn') === 'true') {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    );
  }
}
