import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClientService } from 'src/app/shared/http-client.service';

@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css']
})
export class VehicleAddComponent implements OnInit {
  formSubmitted = false;

  vehicleAddForm: FormGroup;

  constructor(private httpClientServive: HttpClientService) { }

  ngOnInit() {
    this.vehicleAddForm = new FormGroup({
      'licenseplate': new FormControl(null, Validators.required),
      'brand': new FormControl(null, Validators.required),
      'type': new FormControl(null, Validators.required),
      'fuel': new FormControl(null, Validators.required),
      'body': new FormControl(null, Validators.required)
    });
  }

  onSubmit() { 
    const licensplate = this.vehicleAddForm.value.licenseplate;
    const brand = this.vehicleAddForm.value.brand;
    const type = this.vehicleAddForm.value.type;
    const fuel = this.vehicleAddForm.value.fuel;
    const vehicleBody = this.vehicleAddForm.value.body;

    const postObj = this.httpClientServive.onPost('http://localhost:8080/vehicles/vehicle/add/for-user/1/2/' + licensplate + '/' + brand + '/' + type + '/' + fuel + '/' + vehicleBody);
    this.formSubmitted = true;

    /**
     * TODO:
     * navigatie naar voertuigen overzicht*/  
    // this.vehicleAddForm.reset();
  }

}