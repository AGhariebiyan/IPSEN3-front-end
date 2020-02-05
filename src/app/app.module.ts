import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { ProjectInzienPageComponent } from './project/project-inzien-page/project-inzien-page.component';
import { GmapsComponent } from './gmaps/gmaps.component';
import { GmapsLocSearchComponent } from './gmaps/gmaps-loc-search/gmaps-loc-search.component';
import { MaterialModule } from './material/material.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehicleAddComponent } from './vehicles/vehicle-add/vehicle-add.component';
import { TripAddComponent } from './trips/trip-add/trip-add.component';
import { TripModifyComponent } from './trips/trip-modify/trip-modify.component';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

import { ProjectOverviewPageComponent } from './project/project-overview-page/project-overview-page.component';
import {CookieService} from 'ngx-cookie-service';
import { LicensePlateValidatorDirective } from './validators/license-plate-validator.directive';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth/auth.service';
import {NgxSpinnerModule} from 'ngx-spinner';
import {GmapsService} from './gmaps/gmaps.service';
import {TripsOverviewComponent} from './trips/trip-overview-delete/trips-overview.component';
import {VehicleOverviewComponent} from './vehicles/vehicle-overview-delete/vehicle-overview.component';
import { VehicleTripsOverviewComponent } from './vehicles/vehicle-trips-overview/vehicle-trips-overview.component';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { MenuComponent } from './menu/menu.component';

// Toaster messages
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    GmapsComponent,
    GmapsLocSearchComponent,
    ProjectInzienPageComponent,
    ProjectOverviewPageComponent,
    DashboardComponent,
    PageNotFoundComponent,
    TripAddComponent,
    TripModifyComponent,
    TripsOverviewComponent,
    VehiclesComponent,
    VehicleAddComponent,
    VehicleOverviewComponent,
    LicensePlateValidatorDirective,
    LoginComponent,
    VehicleTripsOverviewComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      countDuplicates: true
    }),
    BrowserModule,
    BrowserAnimationsModule,
    GooglePlaceModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [CookieService, GmapsService, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
