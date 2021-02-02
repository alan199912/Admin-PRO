import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AccountComponent } from './account/account.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graph1Component } from './graph1/graph1.component';
import { DoctorComponent } from './maintenance/doctors/doctor/doctor.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { UsersComponent } from './maintenance/users/users.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { title: 'Progress' },
      },
      { path: 'graph1', component: Graph1Component, data: { title: 'Graph' } },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { title: 'Account Settings' },
      },
      {
        path: 'account',
        component: AccountComponent,
        data: { title: 'Account' },
      },
      {
        path: 'promises',
        component: PromisesComponent,
        data: { title: 'Promises' },
      },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RXJS' } },
      {
        path: 'users',
        canActivate: [AdminGuard],
        component: UsersComponent,
        data: { title: 'Users Maintenance' },
      },
      {
        path: 'hospitals',
        component: HospitalsComponent,
        data: { title: 'Hospitals Maintenance' },
      },
      {
        path: 'doctors',
        component: DoctorsComponent,
        data: { title: 'Doctors Maintenance' },
      },
      {
        path: 'doctor/:id',
        component: DoctorComponent,
        data: { title: 'Doctor Maintenance' },
      },
      {
        path: 'search/:term',
        component: SearchComponent,
        data: { title: 'Searches' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
