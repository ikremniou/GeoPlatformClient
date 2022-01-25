import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { localeMessages } from 'src/app/local-locale';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private readonly _snackbar: MatSnackBar) {}

  public notifyError(message: string): void {
    this._snackbar.open(message);
  }

  public notify(message: string): void {
    this._snackbar.open(message);
  }
}
