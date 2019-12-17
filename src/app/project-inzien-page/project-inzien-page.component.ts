import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {GmapsService} from '../gmaps/gmaps.service';

@Component({
  selector: 'app-project-inzien-page',
  templateUrl: './project-inzien-page.component.html',
  styleUrls: ['./project-inzien-page.component.css'],
  providers: [GmapsService]
})
export class ProjectInzienPageComponent implements OnInit {


  public drivenKilometers;
  public estTravelTime;
  constructor(private cdr: ChangeDetectorRef, private mapService: GmapsService) { }


  ngOnInit() {
    this.mapService.drivenKilometers.subscribe((km) => {this.drivenKilometers = km; this.cdr.detectChanges(); } );
    this.mapService.estTravelTime.subscribe((time) => {this.estTravelTime = time; this.cdr.detectChanges(); } );
  }


}
