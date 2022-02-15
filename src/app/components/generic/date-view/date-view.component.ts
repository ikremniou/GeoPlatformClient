import { Component, Input } from '@angular/core';
import { localeMessages } from 'src/app/local-locale';

@Component({
  selector: 'app-date-view',
  templateUrl: './date-view.component.html',
  styleUrls: ['./date-view.component.sass']
})
export class DateViewComponent {
  @Input()
  public date?: Date;
  @Input()
  public type!: 'tap-button';

  constructor() { }

  public dateToString(date: Date): string {
    return new Date(date).toLocaleDateString(localeMessages.locale);
  }
}
