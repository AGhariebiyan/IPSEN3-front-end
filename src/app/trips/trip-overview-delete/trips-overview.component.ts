import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import {HttpClientService} from '../../shared/http-client.service';
import {EventEmitter} from 'events';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';
import {Router} from '@angular/router';
import {Trip} from './trip.model';


@Component({
  selector: 'app-trips',
  templateUrl: './trips-overview.component.html',
  styleUrls: ['./trips-overview.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class TripsOverviewComponent implements OnInit {
  public tripsArray: Trip[] = [];
  checked = false;
  displayedColumns: string[];
  dataSource1: MatTableDataSource<Trip> = new MatTableDataSource<Trip>();
  result: EventEmitter = new EventEmitter();

  selectedIdsArray: Array<number> = [];
  data = Object.assign(this.tripsArray);
  selection = new SelectionModel<Trip>(true, []);


  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  value = '';


  constructor(private httpClientService: HttpClientService, private router: Router) {
    this.displayedColumns = ['select', 'startLocation', 'endLocation', 'KM', 'licensePlate', 'project', 'wijzigen', 'verwijderen'];
    this.getTrips();
  }

  ngOnInit() {

    this.result.on('refreshTripsTable', () => {
      this.getTrips();
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource1.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource1.data.forEach(row => this.selection.select(row));
  }

  select(event, tripId: number) {
    if (event.checked) {
      this.selectedIdsArray.push(tripId);
    } else {
      for (let i = 0; i <= this.selectedIdsArray.length; i++) {
        if (this.selectedIdsArray[i] === tripId) {
          this.selectedIdsArray.splice(i, 1);
        }
      }
    }
  }

  getTrips() {

    this.httpClientService.onGet('/trips/user/' +  localStorage.getItem('userid'))
      .subscribe(
        data => {
          this.tripsArray = [];
          data.forEach(dataE => {
              this.tripsArray.push({
                endKilometergauge: dataE.endKilometergauge,
                startKilometergauge: dataE.startKilometergauge,
                tripId: dataE.tripId,
                userId: dataE.userId,
                startLocation: dataE.startLocation,
                endLocation: dataE.endLocation,
                licensePlate: dataE.licensePlate,
                projectId: dataE.projectId,
                drivenKm: dataE.drivenKm,
              });
            }
          );
          this.dataSource1.data = this.tripsArray;
          this.dataSource1.sort = this.sort;
          this.dataSource1.paginator = this.paginator;
        }
      );

  }


  deleteTrip(tripId: number) {
    this.httpClientService.onDelete('/trips/delete/' + tripId).subscribe(() => {
      this.result.emit('refreshTripsTable');
    });
  }

  removeSelectedRows() {
    this.httpClientService.onPost('/trips/delete', this.selectedIdsArray).subscribe(() => {

      this.result.emit('refreshTripsTable');
    });
  }

  editTrip(tripId: number) {
    this.router.navigate(['ritten/wijzigen/' + tripId]);
    return tripId;
  }


  filterTripsTable(event) {
    this.dataSource1.filter = event.target.value;
    this.value = event.target.value;
  }

}
