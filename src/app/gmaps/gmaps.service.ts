import {EventEmitter} from '@angular/core';

export class GmapsService {

  currentLocations = new EventEmitter<{}>();
  drivenKilometers = new EventEmitter<Number>();
  estTravelTime = new EventEmitter<String>();
  destination =  new EventEmitter<{}>();

}
