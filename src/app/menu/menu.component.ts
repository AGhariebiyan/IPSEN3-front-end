import { Component, OnInit } from '@angular/core';
import {GmapsService} from '../gmaps/gmaps.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [GmapsService]
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
