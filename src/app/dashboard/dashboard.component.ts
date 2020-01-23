import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../shared/http-client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  amountOfTripsByUser = "loading..";
  amountOfProjectsByUser = "loading..";

  constructor(private httpClientService: HttpClientService) {}

  ngOnInit() {
    this.fetchAmountOfTripsAndProjectsByUser();
  }

  fetchAmountOfTripsAndProjectsByUser() {
    const fetchedObj = this.httpClientService.onGet('http://localhost:8080/trips/fetch/unique-projectids-and-trips-amount/' + localStorage.getItem('userid')).pipe()
    .subscribe(
      data => {
        console.log('data 0 = ' + data[0]);
        console.log('data 1 = ' + data[1]);
        this.amountOfTripsByUser = data[0];
        this.amountOfProjectsByUser = data[1];
      },
      error => {
        console.log(error);
    });
  }
}
