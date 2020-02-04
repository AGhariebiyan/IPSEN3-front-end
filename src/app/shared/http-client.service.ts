import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    'Token': localStorage.getItem('jwtoken')
  });
  private urlStart = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  onGet(urlEnd: string): Observable<any> {
    return this.http.get(this.urlStart + urlEnd, {headers: this.httpHeaders});
  }

  post(urlEnd: string, object: any): Observable<any> {
    return this.http.post<any>(this.urlStart + urlEnd, JSON.stringify(object), {headers: this.httpHeaders});
  }

  put(urlEnd: string, object: any): Observable<any> {
    return this.http.put<any>(this.urlStart + urlEnd, JSON.stringify(object), {headers: this.httpHeaders});
  }

  onDelete(urlEnd: string): Observable<any> {
    return this.http.delete(this.urlStart + urlEnd, {headers: this.httpHeaders});
  }
  
  onPost(urlEnd: string) {
   return this.http.post(this.urlStart + urlEnd, null, {headers: this.httpHeaders}).subscribe();
  }

  onPut(urlEnd: string) {
    this.http.put<any>(this.urlStart + urlEnd, JSON.stringify(Object), {headers: this.httpHeaders}).subscribe();
  }
}
