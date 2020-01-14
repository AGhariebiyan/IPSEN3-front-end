import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import {ArrayType} from '@angular/compiler';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  constructor(private http: HttpClient) {
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Token' : 'Hier komt een JWToken'
    }); 

    let options = {
      headers: httpHeaders
    };  

    const postData = {
      username: 'admin',
      password: 'root'
    };

    let fruits: Array<string> = ['Apple', 'Orange', 'Banana'];
    
    this.http.post<any>("http://localhost:8080/trips/testingPOST", JSON.stringify(fruits), options).toPromise().then((data:any) => {
      console.log(data);
    })
  }

  onGet(getUrl: string): Observable<any> {
    return this.http.get(getUrl);
  }

  // onGet(getUrl: string): any {
  //   const objArray = [];
  //
  //   this.http.get(getUrl).pipe(
  //     map(responseData => {
  //       for (const key in responseData) {
  //         objArray.push(responseData[key]);
  //       }
  //     })
  //   ).subscribe();
  //
  //   return objArray;
  // }

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
