import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Trip} from '../../trips/trip-overview-delete/trip.model';

@Component({
  selector: 'app-vehicle-trips-overview',
  templateUrl: './vehicle-trips-overview.component.html',
  styleUrls: ['./vehicle-trips-overview.component.css']
})
export class VehicleTripsOverviewComponent implements OnInit {

  displayedColumns: string[];
  vehicleTripData: MatTableDataSource<Trip> = new MatTableDataSource<Trip>();

  constructor() {
    this.displayedColumns = ['startLocation', 'endLocation', 'project', 'wijzigen', 'verwijderen'];
  }


  ngOnInit() {
  }

}
