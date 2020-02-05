import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {GmapsService} from '../gmaps.service';


@Component({
  selector: 'app-gmaps-loc-search',
  templateUrl: './gmaps-loc-search.component.html',
  styleUrls: ['./gmaps-loc-search.component.css']
})
export class GmapsLocSearchComponent implements OnInit {

  @ViewChild('placesRef', {static: false}) placesRef: GooglePlaceDirective;
  @Input() index: number;
  @Input() placeholder: string;
  @Input() value = '';

  constructor(private mapService: GmapsService) { }

  ngOnInit() {
  }
  public handleAddressChange(address: Address) {
    this.mapService.currentLocations.emit({
      mIndex:  this.index,
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng()
    });
    this.mapService.destination.emit({mIndex: this.index, loc: address.formatted_address});

  }

}
