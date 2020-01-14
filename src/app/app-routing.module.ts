import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ViewTripsPageComponent} from './view-trips-page/view-trips-page.component';
import {ProjectInzienPageComponent} from './project/project-inzien-page/project-inzien-page.component';
import {VehiclesComponent} from './vehicles/vehicles.component';
import {TripDeleteComponent} from './trips/trip-delete/trip-delete.component';

import {NotificationComponent} from './shared/notification/notification.component';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';

import {ProjectOverviewPageComponent} from './project/project-overview-page/project-overview-page.component';
import {VehicleAddComponent} from './vehicles/vehicle-add/vehicle-add.component';
import {TripAddComponent} from './trips/trip-add/trip-add.component';
import { LoginComponent } from './login/login.component';


const appRoutes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'rittenOverzicht', component: TripDeleteComponent},
  {path: 'ritten/toevoegen', component: TripAddComponent},
  {path: 'voertuigen/toevoegen', component: VehicleAddComponent},
  {path: 'voertuigenOverzicht', component: VehiclesComponent},
  {path: 'ritten/inzien', component: ViewTripsPageComponent},
  {path: 'projecten', component: ProjectOverviewPageComponent},
  {path: 'projecten/:projectId', component: ProjectInzienPageComponent},
  {path: 'melding', component: NotificationComponent},
  {path: 'pagina-niet-gevonden', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/pagina-niet-gevonden'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
