import {Component, OnInit, ViewChild} from '@angular/core';
import {Trip} from './trip.model';
import {HttpClientService} from '../shared/http-client.service';
import {EventEmitter} from 'events';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Observable} from 'rxjs';
import {ArrayType} from '@angular/compiler';
import {log} from 'util';

// export interface Trip {
//   startLocation: string;
//   endLocation: string;
//   licensePlate: string;
//   project: number;
// }

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})

export class TripsComponent implements OnInit {

  /*public tripsArray: Trip[] = [
     new Trip('Den Haag', 'Maastricht', 45, 'AA-CV'),
     new Trip('Aruba', 'Bonaire', 45, 'AA-CV'),
     new Trip('Zaandam', 'Leiden', 45, 'AA-CV'),
     new Trip('Den Haag', 'Maastricht', 45, 'AA-CV'),
     new Trip('Den Haag', 'Maastricht', 45, 'AA-CV'),
     new Trip('Den Haag', 'Maastricht', 45, 'AA-CV')
   ];
 */

  p = 1;
  result: EventEmitter = new EventEmitter();

  public tripsArray: Trip[] = [];

  displayedColumns: string[];
  dataSource1: MatTableDataSource<Trip>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  value = '';


  constructor(private httpClientService: HttpClientService) {
    this.displayedColumns = ['startLocation', 'endLocation', 'licensePlate', 'project', 'verwijder'];
    this.getTrips();
    this.dataSource1 = new MatTableDataSource(this.tripsArray);
  }

  ngOnInit() {

    this.result.on('deleteTrip', () => {
      this.getTrips();
      this.dataSource1 = new MatTableDataSource(this.tripsArray);
    });


    this.dataSource1.sort = this.sort;
    this.dataSource1.paginator = this.paginator;
  }


  getTrips() {
    this.httpClientService.onGet('http://localhost:8080/trips/user/1').pipe()
      .subscribe(
        data => {
          data.forEach(dataE => {
              this.tripsArray.push({
                endKilometergauge: dataE.endKilometergauge, startKilometergauge: dataE.startKilometergauge, tripId: dataE.tripId,
                userId: dataE.userId,
                startLocation: dataE.startLocation, endLocation: dataE.endLocation,
                licensePlate: dataE.licensePlate, projectId: dataE.projectId
              });
            }
          );
        }
      );


  }

  // refresh() {
  //   this.myService.doSomething().subscribe((data: PeriodicElement[]) => {
  //     this.dataSource.data = data;
  //   });
  // }

  deleteTrip(id: number) {
    this.httpClientService.onDelete('http://localhost:8080/trips/delete/' + id).subscribe((data: Trip[]) => {
      this.result.emit('deleteTrip');
      this.dataSource1.data = data;
    });
  }

  filterTripsTable(event) {
    this.dataSource1.filter = event.target.value;
    this.value = event.target.value;
  }

}
