import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Trip} from '../../trips/trip-overview-delete/trip.model';
import {Router} from '@angular/router';
import {HttpClientService} from '../../shared/http-client.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-vehicle-trips-overview',
  templateUrl: './vehicle-trips-overview.component.html',
  styleUrls: ['./vehicle-trips-overview.component.css']
})
export class VehicleTripsOverviewComponent implements OnInit {

  displayedColumns: string[];
  vehicleTripData: MatTableDataSource<Trip> = new MatTableDataSource<Trip>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router, private httpClientService: HttpClientService) {
    this.displayedColumns = ['startLocation', 'endLocation', 'drivenKm', 'project', 'wijzigen', 'verwijderen'];
  }

  getTrips() {

    this.httpClientService.onGet('http://localhost:8080/trips/user/1') // TODO: change request to proper one.
      .subscribe(
        data => {
          data.forEach(fetchedTrip => {
              this.vehicleTripData.data.push({
                endKilometergauge: fetchedTrip.endKilometergauge,
                startKilometergauge: fetchedTrip.startKilometergauge,
                tripId: fetchedTrip.tripId,
                userId: fetchedTrip.userId,
                startLocation: fetchedTrip.startLocation,
                endLocation: fetchedTrip.endLocation,
                drivenKm: fetchedTrip.drivenKm,
                licensePlate: fetchedTrip.licensePlate,
                projectId: fetchedTrip.projectId
              });
            }
          );
          this.vehicleTripData.sort = this.sort;
          this.vehicleTripData.paginator = this.paginator;
        }
      );
  }

  ngOnInit() {
    this.getTrips();
  }

  editTrip(tripId: number) {
    this.router.navigate(['ritten/wijzigen/' + tripId]);
    return tripId;
  }
}
