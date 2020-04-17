import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/user/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  constructor(private readonly _authService: AuthService) {
  }

  public canActivate(): boolean {
    if (this._authService.isSessionAlive()){
      return true;
    }
    return false;
  }
}
