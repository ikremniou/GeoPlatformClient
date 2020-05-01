import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot,
  RouterStateSnapshot, UrlTree, Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/user/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  private readonly sessionExpiredMessage = 'Ваша сессия истекла. Необходимо заново авторизоваться';
  private readonly accessDeniedMessage = 'Доступ к запрашиваемому ресурсу запрещён. Необходимо авторизоваться в платформе';

  constructor(
    private readonly _authService: AuthService,
    private readonly _snackBar: MatSnackBar,
    private readonly _router: Router) {
  }

  public canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this._authService.getAccessToken()) {
      this._snackBar.open(this.accessDeniedMessage, 'Хорошо', { duration: 5000 });
      this._router.navigate(['login']);
      return false;
    }

    if (this._authService.isTokenExpired()) {
      this._snackBar.open(this.sessionExpiredMessage, 'Хорошо', { duration: 5000 });
      this._router.navigate(['login']);
      return false;
    }
    return true;
  }
}
