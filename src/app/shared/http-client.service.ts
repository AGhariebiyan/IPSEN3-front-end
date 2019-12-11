import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ArrayType } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  constructor(private http: HttpClient) {}

  onGet(getUrl: string) : any {
    const objArray = [];

    this.http.get(getUrl).pipe(
      map(responseData => {
        for(const key in responseData) {
          objArray.push(responseData[key]);
        }
      })
    ).subscribe();

    return objArray;
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
