import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../shared/http-client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  amountOfTripsByUser = 'loading..';
  amountOfProjectsByUser = 'loading..';

  constructor(private httpClientService: HttpClientService) {}

  ngOnInit() {
    this.fetchAmountOfTripsAndProjectsByUser();
  }

  fetchAmountOfTripsAndProjectsByUser() {
    this.httpClientService.onGet('http://37.97.209.18:8080/trips/fetch/unique-projectids-and-trips-amount/' + localStorage.getItem('userid')).pipe()
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
