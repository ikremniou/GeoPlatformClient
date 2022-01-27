import { Component } from '@angular/core';
import { TabbedNavEntry } from '../generic/tabbed-nav/tabbed-nav-entry';
import { userControlMessages } from './locale/ru/user-control-messages.ru';

@Component({
  selector: 'app-user-control',
  templateUrl: './user-control.component.html',
  styleUrls: ['./user-control.component.sass'],
})
export class UserControlComponent {
  public readonly userControlTabs: TabbedNavEntry[] = [
    { link: 'users-view', name: userControlMessages.users },
    { link: 'invitations', name: userControlMessages.invitations },
  ];
}
