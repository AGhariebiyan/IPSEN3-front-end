import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../shared/http-client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  amountOfTripsByUser = '';
  amountOfProjectsByUser = '';

  constructor(private httpClientService: HttpClientService) {}

  ngOnInit() {
    this.fetchAmountOfTripsAndProjectsByUser();
  }

  fetchAmountOfTripsAndProjectsByUser() {
    this.httpClientService.onGet('/trips/fetch/unique-projectids-and-trips-amount/' + localStorage.getItem('userid')).pipe()
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
