import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { localeMessages } from 'src/app/local-locale';
import { ServerError } from 'src/app/misc/errors/server-error';
import { PlatformValidators } from 'src/app/misc/validators';
import { CreateUserModel } from 'src/app/models/user/create-user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HeaderService } from 'src/app/services/header/header.service';
import { NotificationService } from 'src/app/services/ui/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent {
  public registerForm: FormGroup;
  public invitationMissing = false;
  public lastServerErrors?: string[];

  private invitationId!: string;

  constructor(
    private readonly _router: Router,
    private readonly _authService: AuthService,
    private readonly _headerService: HeaderService,
    private readonly _activeRoute: ActivatedRoute,
    private readonly _userService: UserService,
    private readonly _notificationService: NotificationService,
  ) {
    this._headerService.changedHeader(localeMessages.headers.register);
    this.registerForm = new FormGroup({
      username: new FormControl(undefined, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        PlatformValidators.ascii,
      ]),
      email: new FormControl(undefined, [Validators.required, Validators.email]),
      password: new FormControl(undefined, [Validators.required, Validators.minLength(8), Validators.maxLength(25)]),
      confirmPassword: new FormControl(undefined, this.checkPasswordValidatorFn.bind(this)),
    });

    this._activeRoute.queryParams.subscribe((params) => {
      if (!params.invitation) {
        this.invitationMissing = true;
        this.registerForm.disable();
      }

      this.invitationId = params.invitation;
    });
  }

  public async submitRegister() {
    // if (!this.registerForm.valid) {
    //   return;
    // }

    this.lastServerErrors = undefined;
    const createUserModel: CreateUserModel = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      registerToken: this.invitationId,
    };

    try {
      await this._userService.add(createUserModel).toPromise();
      this._notificationService.notify(localeMessages.userRegisteredSuccess);
      this._authService.logout();
      this._router.navigate(['login'], {
        queryParams: { login: createUserModel.username, password: createUserModel.password },
      });
    } catch (error) {
      if (error instanceof ServerError) {
        this._notificationService.notifyError(localeMessages.userRegisterFailed);
        this.lastServerErrors = error.message.split(',');
      }
    }
  }

  private checkPasswordValidatorFn(confirmPassword: AbstractControl): ValidationErrors | null {
    if (confirmPassword.value) {
      if (this.registerForm.value.password === confirmPassword.value) {
        return null;
      }

      return { passwordNotMatch: true };
    }
    return { required: true };
  }

  public hasError(errorCode: string, control: string): boolean {
    return this.registerForm.hasError(errorCode, control);
  }
}
