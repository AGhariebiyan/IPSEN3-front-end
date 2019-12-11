import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ArrayType } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  constructor(private http: HttpClient) {}

  onGet(getUrl: string) : ArrayType[] {
    const objArray = [];

    this.http.get(getUrl).pipe(
      map(responseData => {
        for(const key in responseData) {
          objArray.push(responseData[key]);
        }
      })
    ).subscribe(responseData => { console.log("response data from GET: " + responseData); });

    return objArray;
  }

  onPost(postUrl: string) {
    this.http.post(postUrl, null).subscribe(responseData => { console.log("response data from POST: " + responseData); });
  }

  onPut(postUrl: string) {
    this.http.put(postUrl, null).subscribe(responseData => { console.log("response data from PUT: " + responseData); });
  }

  onDelete(delUrl: string) {
    return this.http.delete(delUrl);
  }
}
