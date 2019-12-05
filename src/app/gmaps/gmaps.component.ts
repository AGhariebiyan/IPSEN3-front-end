import {Component, AfterViewInit, ViewChild, ElementRef, OnInit, ChangeDetectorRef} from '@angular/core';
import {GmapsService} from './gmaps.service';

@Component({
  selector: 'app-gmaps',
  templateUrl: './gmaps.component.html',
  styleUrls: ['./gmaps.component.css']
})
export class GmapsComponent implements OnInit, AfterViewInit  {
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

  private loc = {};
  private map: google.maps.Map;
  private markerArray = {lat: [], lng: []};
  private directionsDisplay = new google.maps.DirectionsRenderer();

  public km = 0;
  public time: string;

  constructor(private cdr: ChangeDetectorRef, private mapService: GmapsService) { }

  ngOnInit() { this.mapService.currentLocations.subscribe((loc: {mIndex: number, lat: number, lng: number}) => {this.recieveLocation(loc); } );  }

  ngAfterViewInit() {
    this.mapInitializer();
  }

  recieveLocation(loc: {mIndex: number, lat: number, lng: number}) {
    this.markerArray.lat[ loc.mIndex ] = loc.lat;
    this.markerArray.lng[ loc.mIndex ] = loc.lng;
    this.setRoute();
  }

  mapInitializer() {
    const coordinates = new google.maps.LatLng(52.160114, 4.497010);
    const mapOptions: google.maps.MapOptions = {
      center: coordinates,
      zoom: 7,
    };

    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);
  }

  setRoute() {
    // this.alertGmapService(60,"test");
    // return;
    if (this.markerArray.lat.length > 1 && this.markerArray.lng.length > 1) {
      const directionsService = new google.maps.DirectionsService();
      const waypointsLatLng = [];
      const start = new google.maps.LatLng(this.markerArray.lat[0], this.markerArray.lng[0]);
      const end = new google.maps.LatLng(this.markerArray.lat[this.markerArray.lat.length - 1], this.markerArray.lng[this.markerArray.lat.length - 1]);

      let request = {};

      if (this.markerArray.lat.length > 2 && this.markerArray.lng.length > 2) {
        for (let i = 0; i < this.markerArray.lat.length; i++) {
          if (i === 0 || i === (this.markerArray.lng.length - 1) ) {
            continue;
          }
          waypointsLatLng.push({location: new google.maps.LatLng(this.markerArray.lat[i], this.markerArray.lng[i])});
        }
      }
      const bounds = new google.maps.LatLngBounds();

      bounds.extend(start);
      bounds.extend(end);

      if (waypointsLatLng.length > 0) {
        request = {
          origin: start,
          destination: end,
          waypoints: waypointsLatLng,
          travelMode: google.maps.TravelMode.DRIVING
        };
      } else {
        request = {
          origin: start,
          destination: end,
          travelMode: google.maps.TravelMode.DRIVING
        };
      }


      directionsService.route(request,  (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          const point = response.routes[0].legs[0];

          this.directionsDisplay.setMap(null);
          this.directionsDisplay.setDirections(response);
          this.directionsDisplay.setMap(this.map);

          this.km = point.distance.value / 1000;
          this.time = point.duration.text;
          this.alertGmapService(this.km, this.time);
        } else {
          alert('Directions Request from ' + start.toUrlValue(6) + ' to ' + end.toUrlValue(6) + ' failed: ' + status);
        }
      });
    }
  }

  alertGmapService(km:Number, time:String){
    this.mapService.drivenKilometers.emit(km);
    this.mapService.estTravelTime.emit(time);

  }

}
