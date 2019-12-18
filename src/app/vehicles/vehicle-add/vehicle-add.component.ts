import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css']
})
export class VehicleAddComponent implements OnInit {
  formSubmitted = false;

  vehicleAddForm: FormGroup;

  constructor() { }

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
    console.log(this.vehicleAddForm);
    console.log(this.vehicleAddForm.value.licenseplate);
    console.log(this.vehicleAddForm.value.fuel);
    console.log(this.vehicleAddForm.value.body);
    this.formSubmitted = true;
    this.vehicleAddForm.reset();
  }

}
