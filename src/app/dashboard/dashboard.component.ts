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
    // this.fetchAmountOfTripsByUser();
    this.fetchAmountOfProjectsByUser();
  }

  fetchAmountOfTripsByUser() {
    const fetchedObj = this.httpClientService.onGet('http://localhost:8080/trips/amount-of-trips/user/1').pipe()
      .subscribe(
        data => {
          this.amountOfTripsByUser = data;
        },
        error => {
          console.log(error);
    });
  }

  fetchAmountOfProjectsByUser() {
    const fetchedObj = this.httpClientService.onGet('http://localhost:8080/trips/fetch/unique-projectids/1').pipe()
      .subscribe(
        data => {
          this.amountOfProjectsByUser = data.length;
        },
        error => {
          console.log(error);
    });
  }

}
