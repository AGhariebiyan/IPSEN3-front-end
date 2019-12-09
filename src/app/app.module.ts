import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehicleAddComponent } from './vehicles/vehicle-add/vehicle-add.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
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
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GooglePlaceModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
