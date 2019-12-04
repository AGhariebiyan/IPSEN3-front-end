import { Component } from '@angular/core';
import {GmapsService} from './gmaps/gmaps.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [GmapsService]
})
export class AppComponent {
  title = 'DF';
}
