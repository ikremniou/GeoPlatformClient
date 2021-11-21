import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { localeErrors } from '../local-locale/messages/error.ru';
import { ServerError } from '../misc/errors/server-error';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 0) {
          return throwError(new ServerError(localeErrors.failedToReachTheServer));
        }
        return throwError(new ServerError(error.error.message))
      }
      return throwError(error);
    }));
  }
}
