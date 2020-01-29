import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ViewTripsPageComponent} from './view-trips-page/view-trips-page.component';
import {ProjectInzienPageComponent} from './project/project-inzien-page/project-inzien-page.component';
import {NotificationComponent} from './shared/notification/notification.component';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import {ProjectOverviewPageComponent} from './project/project-overview-page/project-overview-page.component';
import {VehicleAddComponent} from './vehicles/vehicle-add/vehicle-add.component';
import {TripAddComponent} from './trips/trip-add/trip-add.component';
import {VehicleModifyComponent} from './vehicles/vehicle-modify/vehicle-modify.component';
import {TripModifyComponent} from './trips/trip-modify/trip-modify.component';
import {TripsOverviewComponent} from './trips/trip-overview-delete/trips-overview.component';
import {VehicleOverviewComponent} from './vehicles/vehicle-overview-delete/vehicle-overview.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './shared/guards/auth-guard.service';

const appRoutes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', canActivate: [AuthGuardService], component: DashboardComponent},
  {path: 'rittenOverzicht', canActivate: [AuthGuardService], component: TripsOverviewComponent},
  {path: 'ritten/toevoegen', canActivate: [AuthGuardService], component: TripAddComponent},
  {path: 'ritten/wijzigen/:tripId', canActivate: [AuthGuardService], component: TripModifyComponent},
  {path: 'voertuigen/toevoegen', canActivate: [AuthGuardService], component: VehicleAddComponent},
  {path: 'voertuigen/wijzigen/:licenseplate', canActivate: [AuthGuardService], component: VehicleModifyComponent},
  {path: 'voertuigenOverzicht', canActivate: [AuthGuardService], component: VehicleOverviewComponent},
  {path: 'ritten/inzien', canActivate: [AuthGuardService], component: ViewTripsPageComponent},
  {path: 'projecten', canActivate: [AuthGuardService], component: ProjectOverviewPageComponent},
  {path: 'projecten/:projectId', canActivate: [AuthGuardService], component: ProjectInzienPageComponent},
  {path: 'melding', canActivate: [AuthGuardService], component: NotificationComponent},
  {path: 'pagina-niet-gevonden', canActivate: [AuthGuardService], component: PageNotFoundComponent},
  {path: '**', redirectTo: '/pagina-niet-gevonden'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
