import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { localeMessages } from 'src/app/local-locale';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HeaderService } from 'src/app/services/header/header.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  public isLoading = false;
  public loginForm = new FormGroup({
    username: new FormControl(undefined, [Validators.required]),
    password: new FormControl(undefined, [Validators.required]),
  });

  private navigateBack = false;

  constructor(
    private readonly _router: Router,
    private readonly _snackBar: MatSnackBar,
    private readonly _authService: AuthService,
    private readonly _activeRoute: ActivatedRoute,
    private readonly _location: Location,
    private readonly _headerService: HeaderService
  ) {
    this._headerService.changedHeader(localeMessages.headers.login);

    this._activeRoute.queryParams.subscribe((params) => {
      if (params.login) {
        this.loginForm.value.username = params.login;
      }
      if (params.password) {
        this.loginForm.value.password = params.password;
      }
    });

    const navigation = this._router.getCurrentNavigation();
    if (navigation?.extras?.state?.return) {
      this.navigateBack = true;
    }
  }

  public ngOnInit(): void {
    if (this._authService.isLoggedIn()) {
      this._router.navigate(['home']);
    }
  }

  public submitLogin(): void {
    this.isLoading = true;
    this._authService.loginUserLocal(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      () => {
        this.isLoading = false;
        if (this.navigateBack) {
          this._location.back();
        }
        this._router.navigate(['home']);
      },
      (error) => {
        this.isLoading = false;
        console.log(`[AuthService] Auth failed: ${error.message}`);
        this._snackBar.open(error.message, 'OK', { duration: 7000 });
      },
    );
  }
}
