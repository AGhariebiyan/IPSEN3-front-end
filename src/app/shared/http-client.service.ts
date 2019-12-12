import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {



  constructor(private http: HttpClient) {
  }

  onGet(getUrl: string): Observable<any> {
    return this.http.get(getUrl);
  }

  onPost(postUrl: string) {
    this.http.post(postUrl, null).subscribe();
  }

  onPut(postUrl: string) {
    this.http.put(postUrl, null).subscribe();
  }

  onDelete(delUrl: string): Observable<any> {
    return this.http.delete(delUrl);
  }
}
