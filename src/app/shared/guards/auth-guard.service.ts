import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, BehaviorSubject, empty } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClientService } from '../http-client.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  private httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json'
  });
  private urlStart = 'http://localhost:8080';

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.guard().then((loggedIn: boolean) => {
      if (loggedIn) {
        return true;
      } else {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }

  private guard(): Promise<boolean> {
      return new Promise(
        (resolve, reject) => {
          if (localStorage.getItem('jwtoken') !== null && this.httpHeaders.get('Token') === null) {
            this.httpHeaders = this.httpHeaders.append('Token', localStorage.getItem('jwtoken'));
          }

          this.http.post('http://localhost:8080/auth', null, {headers: this.httpHeaders}).subscribe(
            data => {
              console.log("data: " + data);
              if(data) {
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
