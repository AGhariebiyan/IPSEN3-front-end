import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RittenInzienPageComponent } from './ritten-inzien-page/ritten-inzien-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material imports
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { ProjectInzienPageComponent } from './project-inzien-page/project-inzien-page.component';
import { GmapsComponent } from './gmaps/gmaps.component';
import { GmapsLocSearchComponent } from './gmaps/gmaps-loc-search/gmaps-loc-search.component';
import { MaterialModule } from './material/material.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehicleAddComponent } from './vehicles/vehicle-add/vehicle-add.component';
import { TripsComponent } from './trips/trips.component';
import { TripAddComponent } from './trips/trip-add/trip-add.component';
import { TripModifyComponent } from './trips/trip-modify/trip-modify.component';
import { VehicleModifyComponent } from './vehicles/vehicle-modify/vehicle-modify.component';
import { HttpClientModule } from '@angular/common/http';
import { VoertuigenComponent } from './vehicles/vehicle Delete/voertuigen.component';

@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    VoertuigenComponent,
    RittenInzienPageComponent,
    HeaderComponent,
    DashboardComponent,
    ProjectInzienPageComponent,
    GmapsComponent,
    GmapsLocSearchComponent,
    ProjectInzienPageComponent,
    VehiclesComponent,
    VehicleAddComponent,
    HeaderComponent,
    DashboardComponent,
    TripsComponent,
    TripAddComponent,
    TripModifyComponent,
    VehicleModifyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GooglePlaceModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
