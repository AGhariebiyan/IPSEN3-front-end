import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ViewTripsPageComponent } from './view-trips-page/view-trips-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material imports
import { MatIconModule, MatToolbarModule, MatMenuModule, MatDividerModule, MatListModule} from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { ProjectInzienPageComponent } from './project/project-inzien-page/project-inzien-page.component';
import { GmapsComponent } from './gmaps/gmaps.component';
import { GmapsLocSearchComponent } from './gmaps/gmaps-loc-search/gmaps-loc-search.component';
import { MaterialModule } from './material/material.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehicleAddComponent } from './vehicles/vehicle-add/vehicle-add.component';
import { TripDeleteComponent } from './trips/trip-delete/trip-delete.component';
import { TripAddComponent } from './trips/trip-add/trip-add.component';
import { TripModifyComponent } from './trips/trip-modify/trip-modify.component';
import { VehicleModifyComponent } from './vehicles/vehicle-modify/vehicle-modify.component';
import { HttpClientModule } from '@angular/common/http';
import { NotificationComponent } from './shared/notification/notification.component';
import { MatButtonModule} from '@angular/material';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

import { ProjectOverviewPageComponent } from './project/project-overview-page/project-overview-page.component';
import {CookieService} from 'ngx-cookie-service';
import { VehicleDeleteComponent } from './vehicles/vehicle-delete/vehicle-delete.component';


@NgModule({
  declarations: [
    AppComponent,
    TripDeleteComponent,
    ViewTripsPageComponent,
    GmapsComponent,
    GmapsLocSearchComponent,
    ProjectInzienPageComponent,
    ProjectOverviewPageComponent,
    VehiclesComponent,
    VehicleAddComponent,
    DashboardComponent,
    NotificationComponent,
    PageNotFoundComponent,
    TripDeleteComponent,
    TripAddComponent,
    TripModifyComponent,
    VehicleModifyComponent,
    VehicleDeleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GooglePlaceModule,
    MaterialModule,
    AppRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
