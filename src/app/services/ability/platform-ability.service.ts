import { Injectable } from '@angular/core';
import { Ability, AbilityBuilder } from '@casl/ability';
import { Claim } from 'src/app/models/claim.model';

@Injectable({
  providedIn: 'root',
})
export class PlatformAbilityService {
  private readonly _claimsKey = 'vggpClaims';

  constructor(private readonly _ability: Ability) {}

  public canView(subjects: string | string[] | undefined): boolean {
    if (!subjects) {
      return true;
    }

    if (typeof subjects === 'string') {
      return this._ability.can('get', subjects);
    } else {
      for (const subject of subjects) {
        if (this._ability.can('get', subject)) {
          return true;
        }
      }
      return false;
    }
  }

  public save(claims: Claim[]) {
    if (claims) {
      this.loadClaims(claims);
      localStorage.setItem(this._claimsKey, JSON.stringify(claims));
    }
  }

  public load(): void {
    const userClaims = localStorage.getItem(this._claimsKey);
    if (userClaims) {
      this.loadClaims(JSON.parse(userClaims));
    }
  }

  public reset(): void {
    this._ability.update([]);
  }

  private loadClaims(claims: Claim[]): void {
    if (claims) {
      const builder = new AbilityBuilder(Ability);
      for (const platformClaim of claims) {
        builder.can(platformClaim.action, platformClaim.subject);
      }
      this._ability.update(builder.rules);
    }
  }
}
