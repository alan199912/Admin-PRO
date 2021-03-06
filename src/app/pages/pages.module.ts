import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//// import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AccountComponent } from './account/account.component';
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { DoctorComponent } from './maintenance/doctors/doctor/doctor.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graph1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    AccountComponent,
    UsersComponent,
    HospitalsComponent,
    DoctorsComponent,
    DoctorComponent,
    SearchComponent,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graph1Component,
    PagesComponent,
    AccountSettingsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    PipesModule,
  ],
})
export class PagesModule {}
