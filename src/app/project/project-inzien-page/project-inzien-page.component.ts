import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {GmapsService} from '../../gmaps/gmaps.service';
import { HttpClientService } from '../../shared/http-client.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-project-inzien-page',
  templateUrl: './project-inzien-page.component.html',
  styleUrls: ['./project-inzien-page.component.css'],
  providers: [GmapsService]
})
export class ProjectInzienPageComponent implements OnInit {


  public projectId: number;
  public projectName: string;
  public licensePlate: string;
  public startLocation: string;
  public endLocation: string;
  public tripId: number;
  public publicTripMap = new Map<number, string>();
  public drivenKilometers;
  public estTravelTime;

  private tripMap = new Map<number, {tripId, licensePlate, startLocation, endLocation, startKilometergauge, endKilometergauge}>();

  constructor(private cdr: ChangeDetectorRef, private mapService: GmapsService, private httpClientService: HttpClientService, private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    this.mapService.estTravelTime.subscribe((time) => {this.estTravelTime = time; this.cdr.detectChanges(); } );

    const fetchedObj = this.httpClientService.onGet('http://localhost:8080/project/getProjectById?projectId=' + this.activatedRoute.snapshot.params.projectId).pipe()
      .subscribe(
        data => {
          this.projectId = data.id;
          this.projectName = data.name;
          this.tripId = data.trips[0].tripId;
          this.licensePlate = data.trips[0].licensePlate;
          this.startLocation = data.trips[0].startLocation;
          this.endLocation = data.trips[0].endLocation;
          this.drivenKilometers = (data.trips[0].endKilometergauge - data.trips[0].startKilometergauge).toFixed(2);

          this.alertGmapService(this.startLocation, this.endLocation);

          if (data.trips.length > 1) {
            data.trips.forEach(remainingTrips => {
              this.publicTripMap.set(remainingTrips.tripId, 'Rit: #' + remainingTrips.tripId + ' ' + remainingTrips.startLocation + ' - ' + remainingTrips.endLocation);
              this.tripMap.set(remainingTrips.tripId, {tripId: remainingTrips.tripId, licensePlate: remainingTrips.licensePlate, startLocation: remainingTrips.startLocation, endLocation: remainingTrips.endLocation, startKilometergauge: remainingTrips.startKilometergauge, endKilometergauge: remainingTrips.endKilometergauge});
            });
          }
        },
        error => {
          console.log(error);
    });
  }

  private alertGmapService(startLoc: string, endLoc: string){
    this.mapService.locationByAddress.emit([startLoc, endLoc]);
  }

  public fetchNewTrip(tripId) {
    this.tripId = this.tripMap.get(tripId).tripId;
    this.licensePlate = this.tripMap.get(tripId).licensePlate;
    this.startLocation = this.tripMap.get(tripId).startLocation;
    this.endLocation = this.tripMap.get(tripId).endLocation;
    this.drivenKilometers = (this.tripMap.get(tripId).endKilometergauge - this.tripMap.get(tripId).startKilometergauge).toFixed(2);

    this.alertGmapService(this.startLocation, this.endLocation);
  }


  public navigateBack() {
    this.route.navigate(['/projecten']);
  }



}
