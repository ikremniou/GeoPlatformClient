import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  constructor(
    private readonly _router: Router,
    private readonly _snackBar: MatSnackBar,
    private readonly _authService: AuthService,
    private readonly _headerService: HeaderService
  ) {
    this._headerService.changedHeader('Авторизация');
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
        this._router.navigate(['home']);
      },
      (error) => {
        this.isLoading = false;
        console.log(`[AuthService] Auth failed: ${error.message}`);
        this._snackBar.open(error.message, 'OK', { duration: 5000 });
      },
    );
  }
}
