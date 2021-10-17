import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { InvitationsComponent } from './components/user-control/invitations/invitations.component';
import { UserControlComponent } from './components/user-control/user-control.component';
import { UsersViewComponent } from './components/user-control/users/users-view/users-view.component';
import { WorkersViewComponent } from './components/workers/workers-view.component';
import { AuthGuard } from './guards/auth/auth.guard';

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
    path: 'workers',
    component: WorkersViewComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
