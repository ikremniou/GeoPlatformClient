import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { AuthService } from 'src/app/services/user/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) { }

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this._authService.getAccessToken();
    if (accessToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` }
      });
    }
    return next.handle(request).pipe(catchError((requestError: HttpErrorResponse) => {
      if (requestError.status === 401) {
        this._authService.logOut();
        this._router.navigate(['login']);
      }
      return throwError(requestError);
    }));
  }
}
