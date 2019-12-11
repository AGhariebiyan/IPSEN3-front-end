import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../shared/http-client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private httpClientService: HttpClientService) {}

  ngOnInit() {
  }

  onClickPost() {
    const fetchedObj = this.httpClientService.onGet('http://localhost:8080/trips/trip/98').pipe()
      .subscribe(
        data => {
          // Hier verdere code plaatsen;
          console.log('data is:', data);
          console.log('data trip kenteken:', data.licensePlate);
        },
        error => {
          console.log(error);
        });
  }

}
