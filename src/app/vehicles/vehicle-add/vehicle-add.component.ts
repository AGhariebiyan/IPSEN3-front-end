import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { LicensePlateService } from '../license-plate-service';
import {map} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';



@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css']
})

export class VehicleAddComponent implements OnInit {
  public formSubmitted = false;
  public imageSource: string;
  public brand: string;
  public type: string;
  private vehicleAddForm: FormGroup;
  private body: string;
  private year: string;
  //private color: string;



  constructor(private httpClientService: HttpClientService, private fb: FormBuilder, private licensePlateService: LicensePlateService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.vehicleAddForm = new FormGroup({
      licenseplate: new FormControl( '', [Validators.required], [this.getVehicleData.bind(this), this.checkLicensePlate.bind(this)]),
      brand: new FormControl( { value: '', disabled: true } ),
      type: new FormControl({ value: '', disabled: true }),
      fuel: new FormControl( { value: '', disabled: true }),
      body: new FormControl( { value: '', disabled: true })
    });

    this.statusChange();
  }

  get getForm() { return this.vehicleAddForm.controls; }

  private statusChange() {
    this.vehicleAddForm.statusChanges.subscribe(val => {
      if ( this.vehicleAddForm.controls.licenseplate.status === 'VALID') {
        this.findImageByVehicle(this.brand + ' ' + this.type + ' ' + this.year );
      } else if ( this.vehicleAddForm.controls.licenseplate.status === 'PENDING') {
        this.spinner.show();
      } else if ( this.vehicleAddForm.controls.licenseplate.status === 'INVALID' ) {
        this.removeFormData();
      }
    });
  }

  onSubmit() {
    const licensplate = this.vehicleAddForm.value.licenseplate;
    this.httpClientService.onPost('http://localhost:8080/vehicles/vehicle/add/for-user/1/0/' + licensplate.toUpperCase() + '/' + this.brand + '/' + this.type + '/' + this.body);
    this.formSubmitted = true;
    /**
     * TODO:
     * navigatie naar voertuigen overzicht*/
    // this.vehicleAddForm.reset();
  }

  private getVehicleData(control: AbstractControl) {
    return this.licensePlateService.checkRdwLicensePlate(control.value.toUpperCase())
      .pipe(
        map(res => {
        if ( res.length === 0 ) {
          return {invalidRDW: true};
        } else {
          this.brand = res[0].merk;
          this.type = res[0].handelsbenaming;
          this.body = res[0].inrichting;
          this.year = res[0].datum_eerste_toelating.substr(0, 4);
          //this.color = res[0].eerste_kleur;
          return null;
        }
      })
    );
  }

  private checkLicensePlate(control: AbstractControl) {
    return this.licensePlateService.checkLicensePlateDF(control.value.toUpperCase())
      .pipe(
        map(res => {
          if ( res !== null ) {
            return {licenseExists: true};
          } else {
            return null;
          }
        })
      );
    }

  private findImageByVehicle(searchUrl: string) {
    this.imageSource = null;
    const fetchedObj = this.httpClientService.onGet('http://localhost:5000/image?term=' + searchUrl ).pipe()
      .subscribe(
        data => {
          this.spinner.hide();
          this.imageSource = data['result'];
        },
        error => {
          this.spinner.hide();
        });
  }

  private removeFormData() {
    this.brand = null;
    this.type = null;
    this.body = null;
    this.imageSource = null;
    this.spinner.hide();
  }
}


