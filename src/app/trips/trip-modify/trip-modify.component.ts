import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {HttpClientService} from 'src/app/shared/http-client.service';
import {GmapsService} from 'src/app/gmaps/gmaps.service';
import {ActivatedRoute} from '@angular/router';
import {Trip} from '../trip-delete/trip-delete.model';

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
  public estTravelTime;
  public licenseplates = [];
  public projects = [];
  public startKilometerGauge;
  public endKilometerGauge;
  private destination = {location: []};

  constructor(private httpClientService: HttpClientService, private cdr: ChangeDetectorRef, private mapService: GmapsService, private activatedRoute: ActivatedRoute) {
    const fetchedObj = this.httpClientService.onGet('http://localhost:8080/vehicles/fetch/unique-licenseplates/1').pipe()
      .subscribe(
        data => {
          data.forEach(licenseplate => {
            this.licenseplates.push(licenseplate);
          });
        }
      );

    const projects = this.httpClientService.onGet('http://localhost:8080/project/getAllProject').pipe()
      .subscribe(
        data => {
          data.forEach(project => {
            this.projects.push(project.name + ' #' + project.id);
          });
        }
      );

  }

  ngOnInit() {
    this.getTrip();

    this.tripUpdateForm = new FormGroup({
      'licenseplate': new FormControl(null),
      'startLocation': new FormControl(null),
      'endLocation': new FormControl(null),
      'drivenKm': new FormControl(null),
      'startKmGauge': new FormControl(null),
      'endKmGauge': new FormControl(null),
      'projectID': new FormControl(null)
    });

    this.mapService.drivenKilometers.subscribe((km) => {
      this.drivenKilometers = km;
      this.endKilometerGauge = this.startKilometerGauge + km;
      this.cdr.detectChanges();
    });
    this.mapService.estTravelTime.subscribe((time) => {
      this.estTravelTime = time;
      this.cdr.detectChanges();
    });
    this.mapService.destination.subscribe((place) => {
      this.destination.location[place.mIndex] = place.loc;
    });
  }

  getTrip() {
    const postObj = this.httpClientService.onGet('http://localhost:8080/trips/trip/' + this.tripId)
      .subscribe(
        (trip) => {
          this.trip = trip; console.log(trip)
          this.tripUpdateForm.patchValue({
            'licenseplate': trip.licensePlate,
            'startLocation': trip.startLocation,
            'endLocation': trip.endLocation,
            'drivenKm': trip.drivenKm,
            'startKmGauge': trip.startKilometergauge,
            'endKmGauge': trip.endKilometergauge,
            'projectID': trip.projectId
          });
        });
  }

  onSubmit() {
    const licenseplate = this.tripUpdateForm.value.licenseplate;
    const drivenKm = this.drivenKilometers;
    const startKmGauge = this.startKilometerGauge;
    const endKmGauge = this.endKilometerGauge;
    const projectId = this.tripUpdateForm.value.projectID.split('#')[1];

    const postObj = this.httpClientService.onPut(
      'http://localhost:8080/trips/trip/update/for-project/' + this.tripId + projectId + '/1/' + licenseplate + '/' + this.destination.location[0] + '/' + this.destination.location[1] + '/' + startKmGauge + '/' + endKmGauge + '/' + drivenKm);
    this.formSubmitted = true;
  }

  retrieveKmGauge(event) {
    const trip = this.httpClientService.onGet('http://localhost:8080/trips/getByLicensePlate?licensePlate=' + event.target.innerText).pipe()
      .subscribe(
        data => {
          this.startKilometerGauge = data.endKilometergauge;
        }
      );
  }

  customStartKilometers(value) {
    this.startKilometerGauge = value;

    if (this.endKilometerGauge && this.startKilometerGauge) {
      this.drivenKilometers = (this.endKilometerGauge - this.startKilometerGauge) > 0 ? this.endKilometerGauge - this.startKilometerGauge : 0;
    }

  }

  customEndKilometers(value) {
    this.endKilometerGauge = value;

    if (this.endKilometerGauge && this.startKilometerGauge) {
      this.drivenKilometers = (this.endKilometerGauge - this.startKilometerGauge) > 0 ? this.endKilometerGauge - this.startKilometerGauge : 0;
    }
  }

}
