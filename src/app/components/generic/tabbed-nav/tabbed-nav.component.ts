import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabbedNavEntry } from './tabbed-nav-entry';

@Component({
  selector: 'app-tabbed-nav',
  templateUrl: './tabbed-nav.component.html',
  styleUrls: ['./tabbed-nav.component.sass']
})
export class TabbedNavComponent {
  @Input()
  public tabs: TabbedNavEntry[] = [];
  public activeLink: string;

  constructor(private readonly _router: Router, private readonly _activatedRoute: ActivatedRoute) {
    this.activeLink = this._activatedRoute.snapshot.firstChild?.url[0].path || '';
  }

  public changeTab(newLink: string): void {
    this.activeLink = newLink;
    this._router.navigate([this.activeLink], { relativeTo: this._activatedRoute });
  }
}
