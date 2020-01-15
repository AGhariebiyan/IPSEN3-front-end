import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import {ArrayType} from '@angular/compiler';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    'Token' : localStorage.getItem('jwtoken')
  }); 

  options = {
    headers: this.httpHeaders
  };  
  
  constructor(private http: HttpClient) {}

  onGet(getUrl: string): Observable<any> {
    return this.http.get(getUrl, this.options);
  }
  
  onPost(postUrl: string) {
    this.http.post(postUrl, null, this.options).subscribe();
  }

  onPostNew(postUrl: string, Object) {
    this.http.post<any>(postUrl, JSON.stringify(Object), this.options).subscribe();
  }

  onPut(putUrl: string) {
    this.http.put<any>(putUrl, JSON.stringify(Object), this.options).subscribe();
  }

  onDelete(delUrl: string) {
    return this.http.delete(delUrl, this.options);
  }
}
