import { Component, OnInit } from '@angular/core';
import { TabbedNavEntry } from '../generic/tabbed-nav/tabbed-nav-entry';
import { securityMessages } from './locale';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.sass'],
})
export class SecurityComponent {
  public readonly securityTabs: TabbedNavEntry[] = [
    { name: securityMessages.roles, link: 'roles' },
    { name: securityMessages.claim, link: 'claims' },
  ];
}
