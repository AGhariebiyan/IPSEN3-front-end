import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {GmapsService} from '../gmaps.service';


@Component({
  selector: 'app-gmaps-loc-search',
  templateUrl: './gmaps-loc-search.component.html',
  styleUrls: ['./gmaps-loc-search.component.scss']
})
export class GmapsLocSearchComponent implements OnInit {

  @ViewChild('placesRef', {static: false}) placesRef: GooglePlaceDirective;
  @Input('gmap-search-index') index: number;
  @Input('gmap-input-placeholder') placeholder: string;
  @Input('custom-value') value = '';

  constructor(private mapService: GmapsService) { }

  ngOnInit() {
  }
  public handleAddressChange(address: Address) {
    // this.locationEvent.emit({lat: address.geometry.location.lat(), lng: address.geometry.location.lng()});
    this.mapService.currentLocations.emit({mIndex: this.index, lat: address.geometry.location.lat(), lng: address.geometry.location.lng()});
    this.mapService.destination.emit({mIndex: this.index, loc: address.formatted_address});

  }

}
