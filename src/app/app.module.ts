import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TripsComponent } from './trips/trips.component';
import {MatCardModule} from '@angular/material';
import {Trip} from './trips/trip.model';
import { VoertuigenComponent } from './vehicle Delete/voertuigen.component';


@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    VoertuigenComponent,

  ],
  imports: [
    BrowserModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
