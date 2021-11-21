import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseTabbedComponent } from '../generic/tabbed/base-tabbled.component';

@Component({
  selector: 'app-user-control',
  templateUrl: './user-control.component.html',
  styleUrls: ['./user-control.component.sass'],
})
export class UserControlComponent extends BaseTabbedComponent {
  constructor(router: Router, activatedRoute: ActivatedRoute) {
    super(router, activatedRoute)
  }
}
