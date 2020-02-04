import { Injectable } from '@angular/core';
import {HttpClientService} from '../shared/http-client.service';
import {map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LicensePlateService {

  constructor(private http: HttpClient, private httpClientService: HttpClientService) { }

  checkRdwLicensePlate(licensePlate: string) {
    licensePlate = licensePlate.replace(/-/g, '');
    return this.http.get('https://opendata.rdw.nl' + '/resource/m9d7-ebf2.json?kenteken=' + licensePlate);
  }

  checkLicensePlateDF(licensePlate: string) {
    return this.httpClientService.onGet('/vehicles/vehicle/' + licensePlate);
  }

}
