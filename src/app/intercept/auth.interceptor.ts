import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly _authService: AuthService) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this._authService.isLoggedIn()) {
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this._authService.getToken()}`),
      });
      return next.handle(authRequest);
    }

    return next.handle(request);
  }
}
