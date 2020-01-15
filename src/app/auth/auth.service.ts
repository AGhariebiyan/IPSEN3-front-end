import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user';
import { Observable } from 'rxjs';
import { HttpClientService } from '../shared/http-client.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {
  public isLoggedIn: Observable<boolean>;

  constructor(
    private router: Router,
    private httpClientService: HttpClientService,
    private http: HttpClient
  ) {}

  login(user: User) {
    if (user.userName !== '' && user.password !== '' ) {
      const fetchedObj = this.httpClientService.onGet('http://localhost:8080/login/' + user.userName + '/' + user.password).pipe()
      .subscribe(
      data => {
        console.log(data);
        localStorage.setItem('jwtoken', data.authToken);
        localStorage.setItem('username', data.username);
        localStorage.setItem('userid', data.userId);

        this.router.navigate(['/dashboard']);

      },
      error => {
        console.log(error);
      });
    }
  }

  logout() {
    localStorage.clear();

    this.router.navigate(['/login']);
  }
}
