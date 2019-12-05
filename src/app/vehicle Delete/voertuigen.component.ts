import { Component, OnInit } from '@angular/core';
import {Vehicle} from '../models/vehicle.model';

@Component({
  selector: 'app-voertuigen',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VoertuigenComponent implements OnInit {
  public vehiclesArray: Vehicle[] = [
    new Vehicle('AA-BB', 'Toyota', 'Mercedes', 45),
    new Vehicle('Aruba', 'Bonaire', 'Mercedes', 65),
    new Vehicle('Den Haag', 'Maastricht', 'AA-CV', 45),
    new Vehicle('Den Haag', 'Maastricht', 'AA-CV', 44),
    new Vehicle('Den Haag', 'Maastricht', 'AA-CV', 65)
  ];


  constructor() { }

  ngOnInit() {
  }

}
