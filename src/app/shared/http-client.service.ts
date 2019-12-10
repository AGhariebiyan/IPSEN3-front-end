import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) {}

  
  onGet(getUrl: string) {
    const objArray = [];

    this.http.get(getUrl).pipe(
      map(responseData => {
        for(const key in responseData) {
          objArray.push(responseData[key])
        }
        return objArray
      })
    ).subscribe(responseData => { console.log(objArray); });
  }

  onPost(postUrl: string) {
    this.http.post(postUrl, null).subscribe(responseData => { console.log(responseData); });
  }

  onPut() {}

  onDelete() {}
}
