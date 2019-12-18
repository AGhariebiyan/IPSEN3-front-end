import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { GmapsService } from 'src/app/gmaps/gmaps.service';
import { PeriodicElement } from 'src/app/project-overview-page/project-overview-page.component';

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

      const projects = this.httpClientService.onGet('http://localhost:8080/trips/fetch/unique-projectids/1').pipe()
      .subscribe(
        data => {
          data.forEach(project => {
            this.projects.push(project);
          });
        }
      )
  
   }

  ngOnInit() {
    this.tripAddForm =  new FormGroup({
      'licenseplate': new FormControl(null, Validators.required),
      'drivenKm': new FormControl(null),
      'startKmGauge': new FormControl(null, Validators.required),
      'endKmGauge': new FormControl(null),
      'projectID': new FormControl(null, Validators.required)
    });

    this.mapService.drivenKilometers.subscribe((km) => {this.drivenKilometers = km; this.cdr.detectChanges(); } );
    this.mapService.estTravelTime.subscribe((time) => {this.estTravelTime = time; this.cdr.detectChanges(); } );
    this.mapService.destination.subscribe((place) => {this.destination.location[place.mIndex] = place.loc; console.log(place)} );

  }


  onSubmit(){
    const licenseplate = this.tripAddForm.value.licenseplate;
    const drivenKm = this.drivenKilometers;
    const startKmGauge = this.tripAddForm.value.startKmGauge;
    const endKmGauge = startKmGauge + drivenKm;
    const projectId = this.tripAddForm.value.projectID;

    console.log(this.destination.location[0]);
    console.log(this.destination.location[1]);

    const postObj = this.httpClientService.onPost(
      'http://localhost:8080/trips/trip/add/for-project/' + projectId + '/1/' + licenseplate + '/' + this.destination.location[0] + '/' + this.destination.location[1] + '/' + startKmGauge + '/' + endKmGauge + '/' + drivenKm);

    this.formSubmitted = true;
  }

}
