import { Component } from '@angular/core';
import { TabbedNavEntry } from '../generic/tabbed-nav/tabbed-nav-entry';
import { timeHubMessages } from './locale';

@Component({
  selector: 'app-time-hub',
  templateUrl: './time-hub.component.html',
  styleUrls: ['./time-hub.component.sass']
})
export class TimeHubComponent {
  public timeHubTabs: TabbedNavEntry[] = [
    { name: timeHubMessages.tabTimeReports, link: 'time-reports'},
    { name: timeHubMessages.tabMonthReports, link: 'monthly-salary'},
  ];
}
