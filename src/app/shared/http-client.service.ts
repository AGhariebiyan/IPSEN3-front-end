import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json'
  });

  constructor(private http: HttpClient) {}

  onGet(urlEnd: string, urlStart = 'http://localhost:8080'): Observable<any> {
    if (localStorage.getItem('jwtoken') !== null && this.httpHeaders.get('Token') === null) {
      this.httpHeaders = this.httpHeaders.append('Token', localStorage.getItem('jwtoken'));
    }
    return this.http.get(urlStart + urlEnd, {headers: this.httpHeaders});
  }

  onGetWithoutHeaders(urlEnd: string, urlStart = 'http://localhost:8080'): Observable<any> {
    return this.http.get(urlStart + urlEnd);
  }

  onPost(urlEnd: string, urlStart = 'http://localhost:8080') {
   return this.http.post(urlStart + urlEnd, null, {headers: this.httpHeaders}).subscribe();
  }

  onPostNew(urlEnd: string, Object, urlStart = 'http://localhost:8080'): Observable<any> {
   return this.http.post<any>(urlStart + urlEnd, JSON.stringify(Object), {headers: this.httpHeaders});
  }

  onPut(urlEnd: string, urlStart = 'http://localhost:8080') {
    this.http.put<any>(urlStart + urlEnd, JSON.stringify(Object), {headers: this.httpHeaders}).subscribe();
  }

  onDelete(urlEnd: string, urlStart = 'http://localhost:8080'): Observable<any> {
    return this.http.delete(urlStart + urlEnd,  {headers: this.httpHeaders});
  }
}
