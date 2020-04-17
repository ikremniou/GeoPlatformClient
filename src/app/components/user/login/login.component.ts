import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/user/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  public isLoginInProgress = false;
  public loginForm = new FormGroup({
    userName: new FormControl(),
    userPassword: new FormControl(),
  });

  constructor(
    private readonly _snackBar: MatSnackBar,
    private readonly _authService: AuthService
    ) { }

  public ngOnInit(): void {
  }

  public submitLogin(): void {
    console.log(`[LoginComponent] Submitting token request for ${this.loginForm.value.userName}`);
    this.isLoginInProgress = true;
    this._authService.logInPassword(this.loginForm.value.userName,
      this.loginForm.value.userPassword).subscribe({
        next: () => {
          this._snackBar.open('Авторизация прошла успешно', 'Хорошо!', { duration: 3000 });
          this.isLoginInProgress = false;
        },
        error: () => this.isLoginInProgress = false
      });
  }
}
