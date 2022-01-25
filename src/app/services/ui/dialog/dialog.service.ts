import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private readonly _matDialog: MatDialog) {}

  public open<T>(template: TemplateRef<any>, data: any): Promise<T> {
    return new Promise<T>((resolve) => {
      this._matDialog
        .open(template, { data })
        .afterClosed()
        .subscribe((dialogResult: T) => {
          resolve(dialogResult);
        });
    });
  }

  public closeAll() {
    this._matDialog.closeAll();
  }
}
