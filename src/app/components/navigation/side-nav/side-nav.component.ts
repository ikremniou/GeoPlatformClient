import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformAbilityService } from 'src/app/services/ability/platform-ability.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavBaseComponent } from '../nav-base-component';
import { PlatformNavigation } from '../platform-navigation';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.sass'],
})
export class SideNavComponent extends NavBaseComponent {
  public navigation = PlatformNavigation;
  @Output('item-selected')
  public itemSelected: EventEmitter<void> = new EventEmitter();

  constructor(
    private readonly _authService: AuthService,
    router: Router, ability: PlatformAbilityService) {
    super(router, ability);
  }

  public navigate(route: string): void {
    super.navigate(route);
    this.itemSelected.next();
  }

  public logout(): void {
    this._authService.logout();
    super.navigate('login');
    this.itemSelected.next();
  }
}
