import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RittenInzienPageComponent } from './ritten-inzien-page/ritten-inzien-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material imports
import { MatIconModule} from "@angular/material";
import { MatCardModule } from '@angular/material/card';
import {GmapsLocSearchComponent} from './gmaps/gmaps-loc-search/gmaps-loc-search.component';
import {GmapsComponent} from './gmaps/gmaps.component';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';
import { ProjectInzienPageComponent } from './project-inzien-page/project-inzien-page.component';

@NgModule({
  declarations: [
    AppComponent,
    RittenInzienPageComponent,
    GmapsComponent,
    GmapsLocSearchComponent,
    ProjectInzienPageComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatIconModule,
    GooglePlaceModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
