import { catchError } from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private readonly _snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((httpError: HttpErrorResponse,
      caught: Observable<HttpEvent<any>>) => {
      if (httpError.status === 400 && httpError.error.message) {
        this._snackBar.open(`Сервер ответил: ${httpError.error.message}`, '', { duration: 3000 });
      }
      switch(httpError.status) {
        case 404: this._snackBar.open('Сервер недоступен', 'Плохо!', { duration: 3000 });
          break;
        case 0: this._snackBar.open('Произошла неизвестная ошибка.\n Возможно, что сервер недоступен',
          'Плохо!', { duration: 5000 });
          break;
      }
      return throwError(caught);
    }));
  }
}
