import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, AbstractControl, FormGroupDirective, NgForm} from '@angular/forms';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { LicensePlateService } from '../license-plate-service';
import {map} from 'rxjs/operators';
import {ErrorStateMatcher} from '@angular/material';


@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css']
})

export class VehicleAddComponent implements OnInit {
  formSubmitted = false;
  vehicleAddForm: FormGroup;

  private brand: string;
  private type: string;
  private fuel: string;
  private body: string;

  constructor(private httpClientService: HttpClientService, private fb: FormBuilder, private licensePlateService: LicensePlateService) { }

  ngOnInit() {
    this.vehicleAddForm = new FormGroup({
      licenseplate: new FormControl( '', [Validators.required], [this.getVehicleData.bind(this), this.checkLicensePlate.bind(this)]),
      brand: new FormControl( { value: '', disabled: true } ),
      type: new FormControl({ value: '', disabled: true }),
      fuel: new FormControl( { value: '', disabled: true }),
      body: new FormControl( { value: '', disabled: true })
    });
    this.valueChange();
  }
  get getForm() { return this.vehicleAddForm.controls; }

  private valueChange(){
    this.vehicleAddForm.valueChanges.subscribe(val => {
        if ( this.vehicleAddForm.controls.licenseplate.status === 'INVALID' ) {
          this.brand = '';
          this.type = '';
          this.body = '';
        }
    });
  }
  onSubmit() {
    const licensplate = this.vehicleAddForm.value.licenseplate;
    const brand = this.brand;
    const type = this.type;
    const fuel = this.vehicleAddForm.value.fuel;
    const vehicleBody =  this.body;

    const postObj = this.httpClientService.onPost('http://localhost:8080/vehicles/vehicle/add/for-user/1/0/' + licensplate.toUpperCase() + '/' + brand + '/' + type + '/' + vehicleBody);

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
          this.brand = '';
          this.type = '';
          this.body = '';
          return {invalidRDW: true};
        } else {
          // console.log("KENTEKEN IS:");
          this.brand = res[0].merk;
          this.type = res[0].handelsbenaming;
          // this.fuel =  res[0].;
          this.body = res[0].inrichting;
          return null;
        }
      })
    );
  }

  private checkLicensePlate(control: AbstractControl){
    return this.licensePlateService.checkLicensePlateDF(control.value.toUpperCase())
      .pipe(
        map(res => {
          console.log(res);
          if ( res !== null ) {
            this.brand = '';
            this.type = '';
            this.body = '';
            return {licenseExists: true};
          } else {
            return null;
          }
        })
      );

  }


}


