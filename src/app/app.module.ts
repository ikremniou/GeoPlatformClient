import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/user-control/register/register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserControlComponent } from './components/user-control/user-control.component';
import { UsersViewComponent } from './components/user-control/users/users-view/users-view.component';
import { InvitationsComponent } from './components/user-control/invitations/invitations.component';
import { AuthInterceptor } from './intercept/auth.interceptor';
import { UsersFormComponent } from './components/user-control/users/users-form/users-form.component';
import { DataTableComponent } from './components/generic/data-table/data-table.component';
import { EntityDialogComponent } from './components/generic/entity-dialog/entity-dialog.component';
import { WorkersViewComponent } from './components/workers/workers-view.component';
import { WorkersFormComponent } from './components/workers/worker-form/worker-form.component';
import { GraphQLModule } from './modules/graphql.module';
import { InvitationFormComponent } from './components/user-control/invitations/invitation-form/invitation-form.component';
import { EntitySelectComponent } from './components/generic/entity-select/entity-select.component';
import { ErrorInterceptor } from './intercept/error.interceptor';
import { PlatformAbilityModule } from './modules/platform-ability.module';
import { RolesComponent } from './components/security/roles/roles.component';
import { ClaimsComponent } from './components/security/claims/claims.component';
import { SecurityComponent } from './components/security/security.component';

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
    PlatformAbilityModule
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
