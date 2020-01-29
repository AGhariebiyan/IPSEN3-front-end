import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClientService} from '../../shared/http-client.service';
import {LicensePlateService} from '../license-plate-service';
import {NgxSpinnerService} from 'ngx-spinner';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-vehicle-modify',
  templateUrl: './vehicle-modify.component.html',
  styleUrls: ['./vehicle-modify.component.css']
})
export class VehicleModifyComponent implements OnInit {
  public formSubmitted = false;
  public imageSource: string;
  public brand: string;
  public type: string;
  public vehicleAddForm: FormGroup;
  public body: string;
  private year: string;
  //private color: string;
  private licenseplate: string = this.activatedRoute.snapshot.params.licenseplate;

  constructor(private httpClientService: HttpClientService, private fb: FormBuilder, private licensePlateService: LicensePlateService, private spinner: NgxSpinnerService, private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.patchForm();

    this.vehicleAddForm = new FormGroup({
      licenseplate: new FormControl( '', [Validators.required], [this.getVehicleData.bind(this), this.checkLicensePlate.bind(this)]),
      brand: new FormControl( { value: '', disabled: true } ),
      type: new FormControl({ value: '', disabled: true }),
      fuel: new FormControl( { value: '', disabled: true }),
      body: new FormControl( { value: '', disabled: true })
    });

    this.statusChange();
  }

  patchForm() {
    this.vehicleAddForm.patchValue({
      licenseplate: 'test'
    });
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
    this.httpClientService.onPut('http://37.97.209.18:8080/vehicles/vehicle/add/for-user/1/0/' + licensplate.toUpperCase() + '/' + this.brand + '/' + this.type + '/' + this.body);
    this.formSubmitted = true;
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
    const fetchedObj = this.httpClientService.onGet('http://37.97.209.18:5000/image?term=' + searchUrl ).pipe()
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
