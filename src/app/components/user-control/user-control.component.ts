import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-control',
  templateUrl: './user-control.component.html',
  styleUrls: ['./user-control.component.sass'],
})
export class UserControlComponent {
  public activeLink: string = '';

  constructor(private readonly _router: Router, private readonly _activatedRoute: ActivatedRoute) {
      this.activeLink = this._activatedRoute.snapshot.firstChild?.url[0].path || '';
  }

  public onUserPathChanged(newActiveLink: string): void {
    this.activeLink = newActiveLink;
    this._router.navigate([this.activeLink], { relativeTo: this._activatedRoute });
  }
}
