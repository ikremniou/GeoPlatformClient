import { Component, OnInit } from '@angular/core';
import { TabbedNavEntry } from '../generic/tabbed-nav/tabbed-nav-entry';
import { workersHubMessages } from './locale';

@Component({
  selector: 'app-workers-hub',
  templateUrl: './workers-hub.component.html',
  styleUrls: ['./workers-hub.component.sass']
})
export class WorkersHubComponent {
  public workersHubTabs: TabbedNavEntry[] = [
    { name: workersHubMessages.workers, link: 'workers'},
    { name: workersHubMessages.categories, link: 'workers-categories'},
    { name: workersHubMessages.positions, link: 'workers-positions'},
  ];
}
