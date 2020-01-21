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
    return this.http.get(getUrl, {headers: this.httpHeaders});
  }

  onGetWithoutHeaders(getUrl: string): Observable<any> {
    return this.http.get(getUrl);
  }

  onPost(postUrl: string) {
   return this.http.post(postUrl, null, {headers: this.httpHeaders}).subscribe();
  }

  onPostNew(postUrl: string, Object): Observable<any> {
   return this.http.post<any>(postUrl, JSON.stringify(Object), {headers: this.httpHeaders});
  }

  onPut(putUrl: string) {
    this.http.put<any>(putUrl, JSON.stringify(Object), {headers: this.httpHeaders}).subscribe();
  }

  onDelete(delUrl: string) {
    return this.http.delete(delUrl,  {headers: this.httpHeaders});
  }
}
