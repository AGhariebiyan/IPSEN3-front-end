import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../shared/http-client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  amountOfTripsByUser : string;
  amountOfProjectsByUser : string;

  constructor(private httpClientService: HttpClientService) {}

  ngOnInit() {
    this.fetchAmountOfTripsAndProjectsByUser();
  }

  fetchAmountOfTripsAndProjectsByUser() {
    const fetchedObj = this.httpClientService.onGet('http://localhost:8080/trips/fetch/unique-projectids-and-trips-amount/1').pipe()
    .subscribe(
      data => {
        this.amountOfTripsByUser = data[0];
        this.amountOfProjectsByUser = data[1];
      },
      error => {
        console.log(error);
    });
  }
}
