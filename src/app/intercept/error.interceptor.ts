import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { localeErrors } from '../local-locale/messages/error.ru';
import { ServerError } from '../misc/errors/server-error';
import { Router } from '@angular/router';
import { DialogService } from '../services/ui/dialog/dialog.service';
import { NotificationService } from '../services/ui/notification/notification.service';
import { localeMessages } from '../local-locale';
import { ServerMultiError } from '../misc/errors/server-multi-error';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly _notification: NotificationService,
    private readonly _dialogService: DialogService,
    private readonly _router: Router,
  ) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 0) {
            return throwError(new ServerError(localeErrors.failedToReachTheServer));
          }
          if (error.status === HttpStatusCode.Forbidden) {
            if (error.error.jwt) {
              this._dialogService.closeAll();
              this._router.navigate(['login'], { state: { return: true } });
              this._notification.notify(localeMessages.pleaseSignInAgainToUpdateToken);
            }
          }
          if (error.error.errors) {
            if (error.error.errors.length === 1) {
              return throwError(new ServerError(error.error.errors[0].message));
            }
            return throwError(new ServerMultiError(error.error.errors));
          }
        }
        return throwError(error);
      }),
    );
  }
}
