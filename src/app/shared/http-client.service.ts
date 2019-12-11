import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  constructor(private http: HttpClient) {}

  onGet(getUrl: string): Observable<object> {
    return this.http.get(getUrl);
  }

  onPost(postUrl: string) {
    this.http.post(postUrl, null).subscribe();
  }

  onPut(postUrl: string) {
    this.http.put(postUrl, null).subscribe();
  }

  onDelete(delUrl: string) {
    return this.http.delete(delUrl);
  }
}
