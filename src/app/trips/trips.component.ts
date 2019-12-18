import { Component, OnInit } from '@angular/core';
import {Trip} from './trip.model';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

constructor() { }
 public tripsArray: Trip[] = [
    new Trip('Den Haag', 'Maastricht', 45, 'AA-CV'),
    new Trip('Aruba', 'Bonaire', 45, 'AA-CV'),
    new Trip('Zaandam', 'Leiden', 45, 'AA-CV'),
    new Trip('Den Haag', 'Maastricht', 45, 'AA-CV'),
    new Trip('Den Haag', 'Maastricht', 45, 'AA-CV'),
    new Trip('Den Haag', 'Maastricht', 45, 'AA-CV')
  ];


  ngOnInit() {
  }

}
