import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { localeMessages } from 'src/app/local-locale';
import { PlatformAbilityService } from 'src/app/services/ability/platform-ability.service';
import { HeaderService } from 'src/app/services/header/header.service';
import { NavBaseComponent } from '../nav-base-component';
import { PlatformNavigation } from '../platform-navigation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent extends NavBaseComponent {
  public navigation = PlatformNavigation;

  constructor(ability: PlatformAbilityService, router: Router, titleService: HeaderService) {
    super(router, ability);
    titleService.changedHeader(localeMessages.headers.mainMenu);
  }
}
