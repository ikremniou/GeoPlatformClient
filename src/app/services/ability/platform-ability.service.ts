import { Injectable } from '@angular/core';
import { Ability, AbilityBuilder } from '@casl/ability';
import { Claim } from 'src/app/models/claim.model';
import { Activity } from '../../models/activity.model';
import { Invite } from '../../models/invite/invitation.model';
import { MonthlyTimeReview } from '../../models/monthly-time-review.model';
import { Project } from '../../models/project.model';
import { Role } from '../../models/role/role.model';
import { TimeReport } from '../../models/time-report.model';
import { User } from '../../models/user/user.model';
import { Worker } from '../../models/worker/worker.model';

export const AbilitySubjects = {
  User: User.name,
  Role: Role.name,
  Activity: Activity.name,
  Invite: Invite.name,
  MonthlyTimeReview: MonthlyTimeReview.name,
  Project: Project.name,
  TimeReport: TimeReport.name,
  Worker: Worker.name,
  Claim: Claim.name,
};

export enum AbilityActions {
  Manage = 'manage',
  Read = 'read',
  Update = 'update',
  Create = 'create',
  Delete = 'delete',
}

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
