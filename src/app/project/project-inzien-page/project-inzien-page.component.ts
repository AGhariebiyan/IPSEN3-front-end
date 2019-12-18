import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {GmapsService} from '../../gmaps/gmaps.service';
import { HttpClientService } from '../../shared/http-client.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-project-inzien-page',
  templateUrl: './project-inzien-page.component.html',
  styleUrls: ['./project-inzien-page.component.css'],
  providers: [GmapsService]
})
export class ProjectInzienPageComponent implements OnInit {


  public projectId: number;
  public projectName: string;

  constructor(private cdr: ChangeDetectorRef, private mapService: GmapsService, private httpClientService: HttpClientService, private aRoute: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    // this.mapService.drivenKilometers.subscribe((km) => {this.drivenKilometers = km; this.cdr.detectChanges(); } );
    // this.mapService.estTravelTime.subscribe((time) => {this.estTravelTime = time; this.cdr.detectChanges(); } );

    const fetchedObj = this.httpClientService.onGet('http://localhost:8080/project/getProjectById?projectId=' + this.aRoute.snapshot.params.projectId).pipe()
      .subscribe(
        data => {
          this.projectId = data.id;
          this.projectName = data.name;
        },
        error => {
          console.log(error);
    });
  }

  public navigateBack(event){
    this.route.navigate(['/projecten']);
  }


}
