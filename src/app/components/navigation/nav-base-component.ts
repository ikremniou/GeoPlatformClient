import { Router } from '@angular/router';
import { PlatformAbilityService } from 'src/app/services/ability/platform-ability.service';

export class NavBaseComponent {
  constructor(protected readonly _router: Router, protected readonly _ability: PlatformAbilityService) {}

  public navigate(route: string): void {
    this._router.navigate([route]);
  }

  public canView(subjects: string | string[] | undefined): boolean {
    return this._ability.canView(subjects);
  }
}
