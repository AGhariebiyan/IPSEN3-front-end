import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RittenInzienPageComponent } from './ritten-inzien-page/ritten-inzien-page.component';
import { ProjectInzienPageComponent } from './project-inzien-page/project-inzien-page.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'ritten/inzien', component: RittenInzienPageComponent},
    { path: 'projecten/:projectId', component: ProjectInzienPageComponent},
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
