import { Component } from '@angular/core';
import { TabbedNavEntry } from '../generic/tabbed-nav/tabbed-nav-entry';
import { projectsHubMessages } from './locale';

@Component({
  selector: 'app-projects-hub',
  templateUrl: './projects-hub.component.html',
  styleUrls: ['./projects-hub.component.sass']
})
export class ProjectsHubComponent {
  public projectsHubTabs: TabbedNavEntry[] = [
    { name: projectsHubMessages.projects, link: 'projects'},
    { name: projectsHubMessages.clients, link: 'clients'},
    { name: projectsHubMessages.activities, link: 'activities'},
  ];
}
