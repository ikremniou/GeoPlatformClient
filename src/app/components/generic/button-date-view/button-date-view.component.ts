import { Component, Input } from '@angular/core';
import { localeMessages } from 'src/app/local-locale';

@Component({
  selector: 'app-button-date-view',
  templateUrl: './button-date-view.component.html',
  styleUrls: ['./button-date-view.component.sass']
})
export class ButtonDateViewComponent {
  @Input()
  public date!: Date;

  constructor() { }

  public dateToString(date: Date): string {
    return new Date(date).toLocaleDateString(localeMessages.locale);
  }
}
