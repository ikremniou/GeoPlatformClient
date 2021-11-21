import { ActivatedRoute, Router } from '@angular/router';

export class BaseTabbedComponent {
  public activeLink: string;

  constructor(private readonly _router: Router, private readonly _activatedRoute: ActivatedRoute) {
    this.activeLink = this._activatedRoute.snapshot.firstChild?.url[0].path || '';
  }

  public changeTab(newLink: string): void {
    this.activeLink = newLink;
    this._router.navigate([this.activeLink], { relativeTo: this._activatedRoute });
  }
}
