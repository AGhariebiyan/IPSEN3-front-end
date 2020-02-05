import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClientService } from '../http-client.service';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private httpClientService: HttpClientService, @Inject(DOCUMENT) private document: Document) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.guard().then((loggedIn: boolean) => {
      if (loggedIn) {
        return true;
      } else {
        // this.router.navigate(['https://www.google.nl/']);
        // this.document.location.href = 'https://www.google.nl/';
      }
    });
  }

  guard(): Promise<boolean> {
    return new Promise(
      (resolve, reject) => {
        this.httpClientService.onPost('/auth', null).subscribe(
          data => {
            if (data) {
              resolve(true);
            } else {
              resolve(false);
            }
          },
          error => {
            console.log(error);
          });
      }
    );
  }
}
