import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user';

@Injectable()
export class AuthService {

  constructor(
    private router: Router
  ) {}

  login(user: User) {
    if (user.userName !== '' && user.password !== '' ) {
      this.router.navigate(['/dashboard']);
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }
}