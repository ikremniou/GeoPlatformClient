import { Injectable } from '@angular/core';
import { Subject, Subscribable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  private readonly titleMessageSubject: Subject<string> = new Subject();

  constructor() { }

  public onToolbarTitleChanged(): Subscribable<string> {
    return this.titleMessageSubject;
  }

  public setToolbarTitle(title: string) {
    this.titleMessageSubject.next(title);
  }
}
