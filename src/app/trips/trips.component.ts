import {Component, OnInit} from '@angular/core';
import {Trip} from './trip.model';
import {HttpClientService} from '../shared/http-client.service';
import {EventEmitter} from 'events';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  /*public tripsArray: Trip[] = [
     new Trip('Den Haag', 'Maastricht', 45, 'AA-CV'),
     new Trip('Aruba', 'Bonaire', 45, 'AA-CV'),
     new Trip('Zaandam', 'Leiden', 45, 'AA-CV'),
     new Trip('Den Haag', 'Maastricht', 45, 'AA-CV'),
     new Trip('Den Haag', 'Maastricht', 45, 'AA-CV'),
     new Trip('Den Haag', 'Maastricht', 45, 'AA-CV')
   ];
 */

  p = 1;
  result: EventEmitter = new EventEmitter();

  public tripsArray: Trip[] = [];

  constructor(private httpClientService: HttpClientService) {
    this.getTrips();
  }

  ngOnInit() {

    this.result.on('deleteTrip', () => {
      this.getTrips();
    });
  }

  getTrips() {
    this.httpClientService.onGet('http://localhost:8080/trips/user/1').pipe()
      .subscribe(
        data => {
          this.tripsArray = data;

        }
      );
  }

  deleteTrip(id: number) {
    this.httpClientService.onDelete('http://localhost:8080/trips/delete/' + id).subscribe(() => {
      this.result.emit('deleteTrip');
    });
  }

}
