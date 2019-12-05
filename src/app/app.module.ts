import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RittenInzienPageComponent } from './ritten-inzien-page/ritten-inzien-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material imports
import { MatIconModule, MatToolbarModule, MatMenuModule, MatDividerModule, MatListModule} from "@angular/material";
import { MatCardModule } from '@angular/material/card';
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

// Material imports
import { MatIconModule, MatToolbarModule, MatMenuModule, MatDividerModule, MatListModule} from "@angular/material";
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';


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
    MatCardModule,
    BrowserAnimationsModule,
    GooglePlaceModule,
    MaterialModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    AppRoutingModule,
    MatDividerModule,
    MatListModule,
    MaterialModule,
    GooglePlaceModule
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
