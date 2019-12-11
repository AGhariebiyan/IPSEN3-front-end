import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-trip-add',
  templateUrl: './trip-add.component.html',
  styleUrls: ['./trip-add.component.css']
})
export class TripAddComponent implements OnInit {

  tripAddForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.tripAddForm =  new FormGroup({
      'licenseplate': new FormControl(null, Validators.required),
      'startLocation': new FormControl(null, Validators.required),
      'endLocation': new FormControl(null, Validators.required),
      'drivenKm': new FormControl(null, Validators.required),
    });
  }

  onSubmit(){
    console.log(this.tripAddForm);
    console.log(this.tripAddForm.value.licenseplate);
    console.log(this.tripAddForm.value.startLocation);
    console.log(this.tripAddForm.value.endLocation);
    console.log(this.tripAddForm.value.drivenKm);
  }

}