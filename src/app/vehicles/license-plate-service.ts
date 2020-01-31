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
    return this.httpClientService.onGetWithoutHeaders('/resource/m9d7-ebf2.json?kenteken=' + licensePlate, 'https://opendata.rdw.nl');
  }

  checkLicensePlateDF(licensePlate: string) {
    return this.httpClientService.onGet('/vehicles/vehicle/' + licensePlate);
  }

}
