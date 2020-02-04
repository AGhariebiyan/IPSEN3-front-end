import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json'
  });

  private urlStart = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  get(urlEnd: string): Observable<any> {
    return this.http.get(this.urlStart + urlEnd, {headers: this.httpHeaders});
  }

  post(urlEnd: string, object: any): Observable<any> {
    this.checkForJWToken();
    
    return this.http.post<any>(this.urlStart + urlEnd, JSON.stringify(Object), {headers: this.httpHeaders});
   }

  private checkForJWToken() {
    if (localStorage.getItem('jwtoken') !== null && this.httpHeaders.get('Token') === null) {
      this.httpHeaders = this.httpHeaders.append('Token', localStorage.getItem('jwtoken'));
    }
  }

  onGet(urlEnd: string): Observable<any> {
    if (localStorage.getItem('jwtoken') !== null && this.httpHeaders.get('Token') === null) {
      this.httpHeaders = this.httpHeaders.append('Token', localStorage.getItem('jwtoken'));
    }
    return this.http.get(this.urlStart + urlEnd, {headers: this.httpHeaders});
  }

  onGetWithoutHeaders(urlEnd: string): Observable<any> {
    return this.http.get(this.urlStart + urlEnd);
  }

  onPost(urlEnd: string) {
   return this.http.post(this.urlStart + urlEnd, null, {headers: this.httpHeaders}).subscribe();
  }

  onPostNew(urlEnd: string, Object): Observable<any> {
   return this.http.post<any>(this.urlStart + urlEnd, JSON.stringify(Object), {headers: this.httpHeaders});
  }

  onPut(urlEnd: string) {
    this.http.put<any>(this.urlStart + urlEnd, JSON.stringify(Object), {headers: this.httpHeaders}).subscribe();
  }

  onDelete(urlEnd: string): Observable<any> {
    return this.http.delete(this.urlStart + urlEnd,  {headers: this.httpHeaders});
  }
}
