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

  constructor(private httpClientServive: HttpClientService, private cdr: ChangeDetectorRef, private mapService: GmapsService) { }

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
    
    this.mapService.drivenKilometers.subscribe((km) => {this.drivenKilometers = km; this.cdr.detectChanges(); } );
    this.mapService.estTravelTime.subscribe((time) => {this.estTravelTime = time; this.cdr.detectChanges(); } );
  }

  onSubmit(){
    const licenseplate = this.tripAddForm.value.licenseplate;
    const startLocation = this.tripAddForm.value.startLocation;
    const endLocation = this.tripAddForm.value.endLocation;
    const drivenKm = this.tripAddForm.value.drivenKm;
    const startKmGauge = this.tripAddForm.value.startKmGauge;
    const endKmGauge = this.tripAddForm.value.endKmGauge;
    const projectId = this.tripAddForm.value.projectID;

    const postObj = this.httpClientServive.onPost(
      'http://localhost:8080/trips/trip/add/for-project/' + projectId + '/1/' + licenseplate + '/' + startLocation + '/' + endLocation + '/' + startKmGauge + '/' + endKmGauge + '/' + drivenKm);

  }

}