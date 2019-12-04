import { Component } from '@angular/core';
import {GmapsService} from './gmaps/gmaps.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GmapsService]
})
export class AppComponent {
  title = 'IPSEN3-front-end';
}
