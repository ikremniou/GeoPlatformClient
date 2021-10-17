import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HeaderService } from 'src/app/services/header/header.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass'],
})
export class ToolbarComponent implements OnDestroy, OnInit {
  public activePage = '';
  public isLoggedIn = false;
  private readonly _headerSubscription: Subscription;

  constructor(
    private readonly _router: Router,
    private readonly _authService: AuthService,
    private readonly _headerService: HeaderService,
  ) {
    this._headerSubscription = this._headerService.onHeaderChanged((newHeader) => {
      this.activePage = newHeader;
    });
  }

  public ngOnInit(): void {
    if (this._authService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
    this._authService.on.logIn.subscribe(() => {
      this.isLoggedIn = true;
    });
  }

  public ngOnDestroy(): void {
    this._headerSubscription.unsubscribe();
  }

  public logOut(): void {
    this.isLoggedIn = false;
    this._authService.logout();
    this._router.navigate(['login']);
  }
}
