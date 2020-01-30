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

  onGet(getUrl: string): Observable<any> {
    if (localStorage.getItem('jwtoken') !== null && this.httpHeaders.get('Token') === null) {
      this.httpHeaders = this.httpHeaders.append('Token', localStorage.getItem('jwtoken'));
    }
    
    return this.http.get('http://37.97.209.18:8080' + getUrl, {headers: this.httpHeaders});
  }

  onGetWithoutHeaders(getUrl: string): Observable<any> {
    return this.http.get('http://37.97.209.18:8080' + getUrl);
  }

  onPost(postUrl: string) {
   return this.http.post('http://37.97.209.18:8080' + postUrl, null, {headers: this.httpHeaders}).subscribe();
  }

  onPostNew(postUrl: string, Object): Observable<any> {
   return this.http.post<any>('http://37.97.209.18:8080' + postUrl, JSON.stringify(Object), {headers: this.httpHeaders});
  }

  onPut(putUrl: string) {
    this.http.put<any>('http://37.97.209.18:8080' + putUrl, JSON.stringify(Object), {headers: this.httpHeaders}).subscribe();
  }

  onDelete(delUrl: string): Observable<any> {
    return this.http.delete('http://37.97.209.18:8080' + delUrl,  {headers: this.httpHeaders});
  }
}
