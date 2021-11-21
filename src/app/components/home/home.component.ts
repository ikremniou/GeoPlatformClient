import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { localeMessages } from 'src/app/local-locale';
import { PlatformAbilityService } from 'src/app/services/ability/platform-ability.service';
import { HeaderService } from 'src/app/services/header/header.service';
import { PlatformNavigation } from './platform-navigation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  public navigation = PlatformNavigation;

  constructor(
    private _ability: PlatformAbilityService,
    private readonly _router: Router,
    private readonly _titleService: HeaderService,
  ) {
    this._titleService.changedHeader(localeMessages.headers.mainMenu);
  }

  public ngOnInit(): void {}

  public navigate(route: string): void {
    this._router.navigate([route]);
  }

  public canView(subjects: string | string[] | undefined): boolean {
    return this._ability.canView(subjects);
  }
}
