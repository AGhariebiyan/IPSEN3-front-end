import {Component, OnInit, ViewChild} from '@angular/core';
import {Trip} from './trip-delete.model';
import {HttpClientService} from '../../shared/http-client.service';
import {EventEmitter} from 'events';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-trips',
  templateUrl: './trip-delete.component.html',
  styleUrls: ['./trip-delete.component.css']
})

export class TripDeleteComponent implements OnInit {

  p = 1;
  result: EventEmitter = new EventEmitter();

  public tripsArray: Trip[] = [];
  displayedColumns: string[];
  dataSource1: MatTableDataSource<Trip> = new MatTableDataSource<Trip>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // @ViewChild(MatTableDataSource, {static: true}) data: MatTableDataSource<Trip>;

  value = '';


  constructor(private httpClientService: HttpClientService) {
    this.displayedColumns = ['startLocation', 'endLocation', 'licensePlate', 'project', 'verwijder'];
    this.getTrips();
  }

  ngOnInit() {

    this.result.on('deleteTrip', () => {
      this.getTrips();
      // window.location.reload();
    });
  }


  getTrips() {

    this.httpClientService.onGet('http://localhost:8080/trips/user/1')
      .subscribe(
        data => {
          console.log(this.tripsArray);
          this.tripsArray = [];
          data.forEach(dataE => {
              this.tripsArray.push({
                endKilometergauge: dataE.endKilometergauge, startKilometergauge: dataE.startKilometergauge, tripId: dataE.tripId,
                userId: dataE.userId,
                startLocation: dataE.startLocation, endLocation: dataE.endLocation,
                licensePlate: dataE.licensePlate, projectId: dataE.projectId
              });
            }
          );
          this.dataSource1.data = this.tripsArray;
          this.dataSource1.sort = this.sort;
          this.dataSource1.paginator = this.paginator;
        }
      );

  }


  deleteTrip(licensePlate: string) {
    this.httpClientService.onDelete('http://localhost:8080/trips/delete/' + licensePlate).subscribe(() => {
      this.result.emit('deleteTrip');
      //  this.dataSource1.data = null;
    });
  }

  filterTripsTable(event) {
    this.dataSource1.filter = event.target.value;
    this.value = event.target.value;
  }

}
