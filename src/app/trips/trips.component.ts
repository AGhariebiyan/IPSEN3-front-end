import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Trip} from './trip.model';
import {HttpClientService} from '../shared/http-client.service';
import {EventEmitter} from 'events';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})

export class TripsComponent implements OnInit {

  p = 1;
  result: EventEmitter = new EventEmitter();

  public tripsArray: Trip[] = [];

  displayedColumns: string[];
  dataSource1: MatTableDataSource<Trip>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatTableDataSource, {static: true}) data: MatTableDataSource<Trip>;

  value = '';


  constructor(private httpClientService: HttpClientService, private changeDetectorRefs: ChangeDetectorRef) {
    this.displayedColumns = ['startLocation', 'endLocation', 'licensePlate', 'project', 'verwijder'];
    this.getTrips();
  }

  ngOnInit() {

    this.result.on('deleteTrip', () => {
      this.getTrips();
    });


    this.dataSource1.sort = this.sort;
    this.dataSource1.paginator = this.paginator;
  }


  getTrips() {
    this.httpClientService.onGet('http://localhost:8080/trips/user/1')
      .subscribe(
        data => {
          data.forEach(dataE => {
              this.tripsArray.push({
                endKilometergauge: dataE.endKilometergauge, startKilometergauge: dataE.startKilometergauge, tripId: dataE.tripId,
                userId: dataE.userId,
                startLocation: dataE.startLocation, endLocation: dataE.endLocation,
                licensePlate: dataE.licensePlate, projectId: dataE.projectId
              });
              this.dataSource1 = new MatTableDataSource(this.tripsArray);
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
    this.httpClientService.onDelete('http://localhost:8080/trips/delete/' + id).subscribe(() => {
      this.result.emit('deleteTrip');
    });
  }


  filterTripsTable(event) {
    this.dataSource1.filter = event.target.value;
    this.value = event.target.value;
  }

}
