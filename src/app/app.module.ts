import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/navigation/home/home.component';
import { RegisterComponent } from './components/user-control/register/register.component';
import { UserControlComponent } from './components/user-control/user-control.component';
import { UsersViewComponent } from './components/user-control/users/users-view/users-view.component';
import { InvitationsComponent } from './components/user-control/invitations/invitations.component';
import { AuthInterceptor } from './intercept/auth.interceptor';
import { UsersFormComponent } from './components/user-control/users/users-form/users-form.component';
import { DataTableComponent } from './components/generic/data-table/data-table.component';
import { EntityDialogComponent } from './components/generic/entity-dialog/entity-dialog.component';
import { WorkersViewComponent } from './components/workers-hub/workers/workers-view.component';
import { WorkersFormComponent } from './components/workers-hub/workers/worker-form/worker-form.component';
import { GraphQLModule } from './modules/graphql.module';
import { InvitationFormComponent } from './components/user-control/invitations/invitation-form/invitation-form.component';
import { EntitySelectComponent } from './components/generic/entity-select/entity-select.component';
import { ErrorInterceptor } from './intercept/error.interceptor';
import { PlatformAbilityModule } from './modules/platform-ability.module';
import { RolesComponent } from './components/security/roles/roles.component';
import { ClaimsComponent } from './components/security/claims/claims.component';
import { SecurityComponent } from './components/security/security.component';
import { RoleFormComponent } from './components/security/roles/role-form/role-form.component';
import { PlatformShutterComponent } from './components/generic/platform-shutter/platform-shutter.component';
import { SideNavComponent } from './components/navigation/side-nav/side-nav.component';
import { TabbedNavComponent } from './components/generic/tabbed-nav/tabbed-nav.component';
import { WorkersHubComponent } from './components/workers-hub/workers-hub.component';
import { WorkerCategoriesComponent } from './components/workers-hub/categories/worker-categories.component';
import { WorkerPositionsComponent } from './components/workers-hub/positions/worker-positions.component';
import { WorkerCategoryFormComponent } from './components/workers-hub/categories/category-form/worker-category-form.component';
import { WorkerPositionFormComponent } from './components/workers-hub/positions/position-form/worker-position-form.component';
import { DateViewComponent } from './components/generic/date-view/date-view.component';
import { ProjectsHubComponent } from './components/projects-hub/projects-hub.component';
import { WorkClientsComponent } from './components/projects-hub/clients/work-clients.component';
import { ProjectsComponent } from './components/projects-hub/projects/projects.component';
import { ActivitiesComponent } from './components/projects-hub/activities/activities.component';
import { WorkClientFormComponent } from './components/projects-hub/clients/work-client-form/work-client-form.component';
import { ProjectFormComponent } from './components/projects-hub/projects/project-form/project-form.component';
import { ActivityFormComponent } from './components/projects-hub/activities/activity-form/activity-form.component';
import { TimeHubComponent } from './components/time-hub/time-hub.component';
import { TimeReportsComponent } from './components/time-hub/time-reports/time-reports.component';
import { MonthlySalaryComponent } from './components/time-hub/monthly-salary/monthly-salary.component';
import { TimeReportFormComponent } from './components/time-hub/time-reports/time-report-form/time-report-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    UserControlComponent,
    UsersViewComponent,
    InvitationsComponent,
    UsersFormComponent,
    DataTableComponent,
    EntityDialogComponent,
    WorkersViewComponent,
    WorkersFormComponent,
    InvitationFormComponent,
    EntitySelectComponent,
    RolesComponent,
    ClaimsComponent,
    SecurityComponent,
    RoleFormComponent,
    PlatformShutterComponent,
    SideNavComponent,
    TabbedNavComponent,
    WorkersHubComponent,
    WorkerCategoriesComponent,
    WorkerPositionsComponent,
    WorkerCategoryFormComponent,
    WorkerPositionFormComponent,
    DateViewComponent,
    ProjectsHubComponent,
    WorkClientsComponent,
    ProjectsComponent,
    ActivitiesComponent,
    WorkClientFormComponent,
    ProjectFormComponent,
    ActivityFormComponent,
    TimeHubComponent,
    TimeReportsComponent,
    MonthlySalaryComponent,
    TimeReportFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    GraphQLModule,
    PlatformAbilityModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
