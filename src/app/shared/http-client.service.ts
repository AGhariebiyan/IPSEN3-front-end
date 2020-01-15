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
    'Content-Type' : 'application/json'
  });

  constructor(private http: HttpClient) {}

  onGet(getUrl: string): Observable<any> {
    // console.log(this.httpHeaders.get('jwtoken'));
    if(localStorage.getItem('jwtoken') !== null && this.httpHeaders.get('Token') === null){
      this.httpHeaders = this.httpHeaders.append('Token', localStorage.getItem('jwtoken'));
    }
    // console.log(this.httpHeaders);
    return this.http.get(getUrl, {headers: this.httpHeaders});
  }

  onGetWithoutHeaders(getUrl: string): Observable<any> {
    return this.http.get(getUrl);
  }


  onPost(postUrl: string) {
    this.http.post(postUrl, null, {headers: this.httpHeaders}).subscribe();
  }

  onPostNew(postUrl: string, Object) {
    this.http.post<any>(postUrl, JSON.stringify(Object), {headers: this.httpHeaders}).subscribe();
  }

  onPut(putUrl: string) {
    this.http.put<any>(putUrl, JSON.stringify(Object), {headers: this.httpHeaders}).subscribe();
  }

  onDelete(delUrl: string) {
    return this.http.delete(delUrl, {headers: this.httpHeaders});
  }
}
