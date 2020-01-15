import { Injectable } from '@angular/core';
import {HttpClientService} from '../shared/http-client.service';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LicensePlateService {

  constructor(private httpClientService: HttpClientService) { }

  checkRdwLicensePlate(licensePlate: string) {
    licensePlate = licensePlate.replace(/-/g, '');
    const fetchedObj = this.httpClientService.onGetWithoutHeaders('https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=' + licensePlate);
    return fetchedObj;
  }

  checkLicensePlateDF(licensePlate: string) {
    const fetchedObj = this.httpClientService.onGet('http://localhost:8080/vehicles/vehicle/' + licensePlate);
    return fetchedObj;
  }

}
