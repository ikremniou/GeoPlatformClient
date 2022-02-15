import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/navigation/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ClaimsComponent } from './components/security/claims/claims.component';
import { RolesComponent } from './components/security/roles/roles.component';
import { SecurityComponent } from './components/security/security.component';
import { InvitationsComponent } from './components/user-control/invitations/invitations.component';
import { RegisterComponent } from './components/user-control/register/register.component';
import { UserControlComponent } from './components/user-control/user-control.component';
import { UsersViewComponent } from './components/user-control/users/users-view/users-view.component';
import { WorkersViewComponent } from './components/workers-hub/workers/workers-view.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { WorkerCategoriesComponent } from './components/workers-hub/categories/worker-categories.component';
import { WorkerPositionsComponent } from './components/workers-hub/positions/worker-positions.component';
import { WorkersHubComponent } from './components/workers-hub/workers-hub.component';
import { ProjectsHubComponent } from './components/projects-hub/projects-hub.component';
import { ProjectsComponent } from './components/projects-hub/projects/projects.component';
import { WorkClientsComponent } from './components/projects-hub/clients/work-clients.component';
import { ActivitiesComponent } from './components/projects-hub/activities/activities.component';
import { TimeHubComponent } from './components/time-hub/time-hub.component';
import { TimeReportsComponent } from './components/time-hub/time-reports/time-reports.component';
import { MonthlySalaryComponent } from './components/time-hub/monthly-salary/monthly-salary.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-control',
    component: UserControlComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'users-view',
        pathMatch: 'full',
      },
      {
        path: 'users-view',
        component: UsersViewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'invitations',
        component: InvitationsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'security',
    component: SecurityComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'roles',
        pathMatch: 'full',
      },
      {
        path: 'roles',
        component: RolesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'claims',
        component: ClaimsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'workers-hub',
    component: WorkersHubComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'workers',
        pathMatch: 'full',
      },
      {
        path: 'workers',
        component: WorkersViewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'workers-categories',
        component: WorkerCategoriesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'workers-positions',
        component: WorkerPositionsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'projects-hub',
    component: ProjectsHubComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full',
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'clients',
        component: WorkClientsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'activities',
        component: ActivitiesComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'time-hub',
    component: TimeHubComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'time-reports',
        pathMatch: 'full',
      },
      {
        path: 'time-reports',
        component: TimeReportsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'monthly-salary',
        component: MonthlySalaryComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
