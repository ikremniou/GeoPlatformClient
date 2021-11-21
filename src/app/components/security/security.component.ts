import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseTabbedComponent } from '../generic/tabbed/base-tabbled.component';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.sass'],
})
export class SecurityComponent extends BaseTabbedComponent {
  constructor(router: Router, activatedRoute: ActivatedRoute) {
    super(router, activatedRoute);
  }
}
