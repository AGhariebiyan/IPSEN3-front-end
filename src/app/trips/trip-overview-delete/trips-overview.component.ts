import {Component, OnInit, ViewChild} from '@angular/core';
import {Trip} from './trip.model';
import {HttpClientService} from '../../shared/http-client.service';
import {EventEmitter} from 'events';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';
import {Router} from '@angular/router';


@Component({
  selector: 'app-trips',
  templateUrl: './trips-overview.component.html',
  styleUrls: ['./trips-overview.component.css'],
})

export class TripsOverviewComponent implements OnInit {

  checked = false;
  public tripsArray: Trip[] = [];
  displayedColumns: string[];
  dataSource1: MatTableDataSource<Trip> = new MatTableDataSource<Trip>();
  result: EventEmitter = new EventEmitter();

  selectedIdsArray: Array<number> = [];

  // selectedIdsArray: number[] = [];
  data = Object.assign(this.tripsArray);
  selection = new SelectionModel<Trip>(true, []);


  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // @ViewChild(MatTableDataSource, {static: true}) data: MatTableDataSource<Trip>;

  value = '';


  constructor(private httpClientService: HttpClientService, private router: Router) {
    this.displayedColumns = ['select', 'startLocation', 'endLocation', 'licensePlate', 'project', 'wijzigen'];
    this.getTrips();
  }

  ngOnInit() {

    this.result.on('refreshTrip', () => {
      this.getTrips();
      // window.location.reload();
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

  select(event, tripId: number, index: number) {
    if (event.checked) {
      this.selectedIdsArray.push(tripId);
    } else {
      // this.selectedIdsArray.splice(index, 1);
      for( let  i = 0; i <= this.selectedIdsArray.length; i++) {
        if ( this.selectedIdsArray[i] === tripId ) {
          this.selectedIdsArray.splice(i, 1);
        }
      }
      }
    // console.log(this.selectedIdsArray);
  }

  getTrips() {

    this.httpClientService.onGet('http://localhost:8080/trips/user/1')
      .subscribe(
        data => {
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


  deleteTrip(tripId: number) {
    this.httpClientService.onDelete('http://localhost:8080/trips/delete/' , tripId).subscribe(() => {
      this.result.emit('refreshTrip');
    });
  }

  removeSelectedRows() {
    console.log('removeSelected:', this.selectedIdsArray);
    // for (const tripId of this.selectedIdsArray) {
    //   this.httpClientService.onDelete('http://localhost:8080/trips/delete/' + tripId).subscribe(() => {
    //     this.result.emit('refreshTrip');
    //   });
    // }
    this.httpClientService.onPostNew('http://localhost:8080/trips/delete', this.selectedIdsArray);
    this.result.emit('refreshTrip');
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
