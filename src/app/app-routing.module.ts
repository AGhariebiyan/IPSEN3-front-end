import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RittenInzienPageComponent } from './ritten-inzien-page/ritten-inzien-page.component';
import { ProjectInzienPageComponent } from './project/project-inzien-page/project-inzien-page.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import {TripsComponent} from './trips/trips.component';
import { ProjectOverviewPageComponent } from './project/project-overview-page/project-overview-page.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'ritten', component: TripsComponent},
    { path: 'voertuigen', component: VehiclesComponent},
    { path: 'ritten/inzien', component: RittenInzienPageComponent},
    { path: 'projecten', component: ProjectOverviewPageComponent},
    { path: 'projecten/:projectId', component: ProjectInzienPageComponent},
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
