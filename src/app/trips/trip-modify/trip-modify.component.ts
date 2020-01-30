import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {HttpClientService} from 'src/app/shared/http-client.service';
import {GmapsService} from 'src/app/gmaps/gmaps.service';
import {ActivatedRoute} from '@angular/router';
import {Trip} from '../trip-overview-delete/trip.model';

@Component({
  selector: 'app-trip-modify',
  templateUrl: './trip-modify.component.html',
  styleUrls: ['./trip-modify.component.css']
})
export class TripModifyComponent implements OnInit {
  public trip: Trip;
  formSubmitted = false;
  tripUpdateForm: FormGroup;

  public tripId = this.activatedRoute.snapshot.params.tripId;
  public drivenKilometers;
  public licenseplates = [];
  public projectNames = [];
  public projectIds = [];
  private destination = {location: []};
  private dbData = true;

  constructor(private httpClientService: HttpClientService,
              private cdr: ChangeDetectorRef,
              private mapService: GmapsService,
              private activatedRoute: ActivatedRoute
  ) {
    this.httpClientService.onGet('http://37.97.209.18:8080/vehicles/fetch/unique-licenseplates/1').pipe()
      .subscribe(
        data => {
          data.forEach(licenseplate => {
            this.licenseplates.push(licenseplate);
          });
        }
      );

    this.httpClientService.onGet('http://37.97.209.18:8080/project/getAllProject').pipe()
      .subscribe(
        data => {
          data.forEach(project => {
            this.projectNames.push(project.name);
            this.projectIds.push(project.id);
          });
        }
      );
  }

  ngOnInit() {
    this.getTrip();

    this.tripUpdateForm = new FormGroup({
      licenseplate: new FormControl(null),
      startLocation: new FormControl(null),
      endLocation: new FormControl(null),
      drivenKm: new FormControl(null),
      startKmGauge: new FormControl(null),
      endKmGauge: new FormControl(null),
      projectID: new FormControl(null)
    });
    this.setSubscribes();
  }

  getTrip() {
    this.httpClientService.onGet('http://37.97.209.18:8080/trips/trip/' + this.tripId)
      .subscribe(
        (trip) => {
          this.trip = trip;
          this.tripUpdateForm.patchValue({
            licenseplate: trip.licensePlate,
            startLocation: trip.startLocation,
            endLocation: trip.endLocation,
            drivenKm: trip.drivenKm,
            startKmGauge: trip.startKilometergauge,
            endKmGauge: trip.endKilometergauge,
            projectID: trip.projectId
          });
          this.destination.location[0] = trip.startLocation;
          this.destination.location[1] = trip.endLocation;
          this.alertGmapService(trip.startLocation, trip.endLocation);
        });
  }

  get getForm() { return this.tripUpdateForm.controls; }

  onSubmit() {
    const licenseplate =  this.tripUpdateForm.value.licenseplate;
    const drivenKm = this.tripUpdateForm.value.drivenKm;
    const startKmGauge = this.tripUpdateForm.value.startKmGauge;
    const endKmGauge = this.tripUpdateForm.value.endKmGauge;
    const projectId = this.tripUpdateForm.value.projectID;


    this.httpClientService.onPut(
      '/trips/trip/update/for-project/' +
      this.tripId + '/' +
      projectId + '/' +
      localStorage.getItem('userid') + '/' +
      licenseplate + '/' +
      this.destination.location[0] + '/' +
      this.destination.location[1] + '/' +
      startKmGauge + '/' +
      endKmGauge + '/' +
      drivenKm
    );
    this.formSubmitted = true;
  }

  retrieveKmGauge(event) {
    this.httpClientService.onGet('/trips/getByLicensePlate?licensePlate=' + event.target.innerText).pipe()
      .subscribe(
        data => {
          this.tripUpdateForm.patchValue({
            startKmGauge: data.endKilometergauge,
            endKmGauge: data.endKilometergauge + this.tripUpdateForm.value.drivenKm
          });
        }
      );
  }

  private setSubscribes() {
    this.mapService.drivenKilometers.subscribe((km) => {
      if (this.dbData === false) {
        this.tripUpdateForm.patchValue({
          endKmGauge: this.tripUpdateForm.value.startKmGauge + km,
          drivenKm: km
        });
      } else {
        this.dbData = false;
      }
      this.cdr.detectChanges();
    });

    this.mapService.destination.subscribe((place) => {
      this.destination.location[place.mIndex] = place.loc;
    });
  }

  customStartKilometers(value) {

    if (this.tripUpdateForm.value.endKmGauge && this.tripUpdateForm.value.startKmGauge) {
      const drivenKilometers = (this.tripUpdateForm.value.endKmGauge - value) > 0 ? this.tripUpdateForm.value.endKmGauge - value : 0;
      this.tripUpdateForm.patchValue({
        drivenKm: drivenKilometers
     });
    }
  }

  customEndKilometers(value) {
    if (this.tripUpdateForm.value.endKmGauge && this.tripUpdateForm.value.startKmGauge) {
      const drivenKilometers = (value - this.tripUpdateForm.value.startKmGauge) > 0 ? value - this.tripUpdateForm.value.startKmGauge : 0;
      this.tripUpdateForm.patchValue({
        drivenKm: drivenKilometers
     });
    }
  }

  private alertGmapService(startLoc: string, endLoc: string) {
    this.mapService.locationByAddress.emit([startLoc, endLoc]);
  }

}
