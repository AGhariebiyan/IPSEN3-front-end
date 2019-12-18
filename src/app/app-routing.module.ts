import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewTripsPageComponent } from './view-trips-page/view-trips-page.component';
import { ProjectInzienPageComponent } from './project-inzien-page/project-inzien-page.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import {TripsComponent} from './trips/trips.component';

import { NotificationComponent } from './shared/notification/notification.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

import { ProjectOverviewPageComponent } from './project-overview-page/project-overview-page.component';


const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent},
    { path: 'ritten', component: TripsComponent},
    { path: 'voertuigen', component: VehiclesComponent},
    { path: 'ritten/inzien', component: ViewTripsPageComponent},
    { path: 'projecten/:projectId', component: ProjectInzienPageComponent},
    { path: 'melding', component: NotificationComponent},
    { path: 'pagina-niet-gevonden', component: PageNotFoundComponent},
    { path: '**', redirectTo: '/pagina-niet-gevonden' }
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
