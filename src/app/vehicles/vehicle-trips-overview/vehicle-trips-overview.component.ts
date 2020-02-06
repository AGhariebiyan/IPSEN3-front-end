import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Trip} from '../../trips/trip-overview-delete/trip.model';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClientService} from '../../shared/http-client.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {EventEmitter} from 'events';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-vehicle-trips-overview',
  templateUrl: './vehicle-trips-overview.component.html',
  styleUrls: ['./vehicle-trips-overview.component.css']
})
export class VehicleTripsOverviewComponent implements OnInit {

  licensePlate = this.activatedRoute.snapshot.params.licenseplate;
  displayedColumns: string[];
  vehicleTripData: MatTableDataSource<Trip> = new MatTableDataSource<Trip>();
  result: EventEmitter = new EventEmitter();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router,
              private httpClientService: HttpClientService,
              private activatedRoute: ActivatedRoute,
              private toaster: ToastrService
  ) {
    this.displayedColumns = ['startLocation', 'endLocation', 'drivenKm', 'project', 'wijzigen', 'verwijderen'];
  }

  getTrips() {
    this.vehicleTripData.data = [];

    this.httpClientService.onGet('/trips/getallByLicensePlate?licensePlate=' + this.licensePlate)
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
    this.result.on('refreshTripsTable', () => {
      this.getTrips();
    });
  }

  editTrip(tripId: number) {
    this.router.navigate(['ritten/wijzigen/' + tripId]);
    return tripId;
  }

  deleteTrip(event, tripId: number) {
    this.httpClientService.onDelete('/trips/delete/' + tripId).subscribe(() => {
      this.toaster.success('De rit is succesvol verwijderd.', 'Rit verwijderd!', {
        positionClass: 'toast-bottom-left'
      });
      this.result.emit('refreshTripsTable');
    });
    event.stopPropagation();
  }
}
