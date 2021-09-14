import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private readonly _headerSubject = new BehaviorSubject<string>('');

  constructor() { }
  public changedHeader(header: string): void {
    this._headerSubject.next(header);
  }

  public onHeaderChanged(handler: (header: string) => void): Subscription {
    return this._headerSubject.subscribe(handler);
  }
}
