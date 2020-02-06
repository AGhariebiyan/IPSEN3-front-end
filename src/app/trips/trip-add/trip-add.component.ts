import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {HttpClientService} from 'src/app/shared/http-client.service';
import {GmapsService} from 'src/app/gmaps/gmaps.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

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

  constructor(private httpClientService: HttpClientService,
              private cdr: ChangeDetectorRef,
              private mapService: GmapsService,
              private toaster: ToastrService,
              private router: Router
  ) {

    this.httpClientService.onGet('/vehicles/fetch/unique-licenseplates/' + localStorage.getItem('userid')).pipe()
      .subscribe(
        data => {
          data.forEach(licenseplate => {
            this.licenseplates.push(licenseplate);
          });
        }
      );

    this.httpClientService.onGet('/project/getAllProject').pipe()
      .subscribe(
        data => {
          data.forEach(project => {
            this.projects.push(project.name + ' #' + project.id);
          });
        }
      );

  }

  ngOnInit() {
    this.tripAddForm = new FormGroup({
      licenseplate: new FormControl(null),
      startLocation: new FormControl(null),
      endLocation: new FormControl(null),
      drivenKm: new FormControl(null),
      startKmGauge: new FormControl(null),
      endKmGauge: new FormControl(null),
      projectID: new FormControl(null)
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


  onSubmit() {
    const licenseplate = this.tripAddForm.value.licenseplate;
    const drivKm = this.drivenKilometers;
    const startKmGauge = this.startKilometerGauge;
    const endKmGauge = this.endKilometerGauge;
    const projId = this.tripAddForm.value.projectID.split('#')[1];
    const tripToAdd = {
      id: null,
      projectId: projId,
      userId: localStorage.getItem('userid'),
      licensePlate: licenseplate,
      startLocation: this.destination.location[0],
      endLocation: this.destination.location[1],
      startKilometergauge: startKmGauge,
      endKilometergauge: endKmGauge,
      drivenKm: drivKm
    };

    this.httpClientService.onPost('/trips/trip/add/for-project', tripToAdd).subscribe(() => {
      this.formSubmitted = true;
      this.toaster.success('De rit is succesvol toegevoegd.', 'Rit toegevoegd!', {
        positionClass: 'toast-bottom-left'
      });
      this.router.navigate(['/rittenOverzicht']);
    });
  }

  retrieveKmGauge(event) {
    this.httpClientService.onGet('/trips/getByLicensePlate?licensePlate=' + event.target.innerText).pipe()
      .subscribe(
        data => {
          this.startKilometerGauge = data.endKilometergauge;
          if (this.drivenKilometers) {
            this.endKilometerGauge = this.startKilometerGauge + this.drivenKilometers;
          }
        }
      );
  }

  customStartKilometers(value) {
    this.startKilometerGauge = value;

    if (this.endKilometerGauge && this.startKilometerGauge) {
      this.drivenKilometers =
        (this.endKilometerGauge - this.startKilometerGauge) > 0 ? this.endKilometerGauge - this.startKilometerGauge : 0;
    }

  }

  customEndKilometers(value) {
    this.endKilometerGauge = value;

    if (this.endKilometerGauge && this.startKilometerGauge) {
      this.drivenKilometers =
        (this.endKilometerGauge - this.startKilometerGauge) > 0 ? this.endKilometerGauge - this.startKilometerGauge : 0;
    }
  }


}
