import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { GmapsService } from 'src/app/gmaps/gmaps.service';

@Component({
  selector: 'app-trip-add',
  templateUrl: './trip-add.component.html',
  styleUrls: ['./trip-add.component.css'],
  providers: [GmapsService]
})
export class TripAddComponent implements OnInit {
  formSubmitted = false;
  tripAddForm: FormGroup;

  public drivenKilometers;
  public estTravelTime;
  public licenseplates = [];
  public projects = [];
  public startKilometerGauge;
  public endKilometerGauge;
  private destination = {location: []};

  constructor(private httpClientService: HttpClientService, private cdr: ChangeDetectorRef, private mapService: GmapsService) {
    const fetchedObj = this.httpClientService.onGet('http://localhost:8080/vehicles/fetch/unique-licenseplates/1').pipe()
      .subscribe(
        data => {
          data.forEach(licenseplate => {
            this.licenseplates.push(licenseplate);
          });
        }
      )

      const projects = this.httpClientService.onGet('http://localhost:8080/project/getAllProject').pipe()
      .subscribe(
        data => {
          data.forEach(project => {
            this.projects.push(project.name + ' #' + project.id);
          });
        }
      )

   }

  ngOnInit() {
    this.tripAddForm =  new FormGroup({
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
    } );
    this.mapService.estTravelTime.subscribe((time) => {this.estTravelTime = time; this.cdr.detectChanges(); } );
    this.mapService.destination.subscribe((place) => {this.destination.location[place.mIndex] = place.loc;} );

  }


  onSubmit(){
    const licenseplate = this.tripAddForm.value.licenseplate;
    const drivenKm = this.drivenKilometers;
    const startKmGauge = this.startKilometerGauge;
    const endKmGauge = this.endKilometerGauge;
    const projectId = this.tripAddForm.value.projectID.split('#')[1];

    const postObj = this.httpClientService.onPost(
      'http://localhost:8080/trips/trip/add/for-project/' + projectId + '/1/' + licenseplate + '/' + this.destination.location[0] + '/' + this.destination.location[1] + '/' + startKmGauge + '/' + endKmGauge + '/' + drivenKm);


    this.formSubmitted = true;
  }

  retrieveKmGauge(event) {
    const trip = this.httpClientService.onGet('http://localhost:8080/trips/getByLicensePlate?licensePlate='+ event.target.innerText).pipe()
      .subscribe(
        data => {
          console.log(data);
          this.startKilometerGauge = data.endKilometergauge;
        }
      );
  }

  customStartKilometers(value) {
    this.startKilometerGauge = value;

    if(this.endKilometerGauge && this.startKilometerGauge)
      this.drivenKilometers =  (this.endKilometerGauge - this.startKilometerGauge) > 0 ? this.endKilometerGauge - this.startKilometerGauge : 0;

  }
  customEndKilometers(value) {
    this.endKilometerGauge = value;

    if(this.endKilometerGauge && this.startKilometerGauge)
      this.drivenKilometers = (this.endKilometerGauge - this.startKilometerGauge) > 0 ? this.endKilometerGauge - this.startKilometerGauge : 0;
  }


}
