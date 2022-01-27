import { claimsMessages } from '../components/security/claims/locale/ru/claims-messages.ru';
import { TableField } from '../misc/data-table/field-decorator';
import { AbilityActions, AbilitySubjects } from '../services/ability/platform-ability.service';


export const actionResolver = (action: string) => {
  switch (action) {
    case AbilityActions.Create:
      return claimsMessages.actions.create;
    case AbilityActions.Delete:
      return claimsMessages.actions.delete;
    case AbilityActions.Manage:
      return claimsMessages.actions.manage;
    case AbilityActions.Read:
      return claimsMessages.actions.read;
    case AbilityActions.Update:
      return claimsMessages.actions.update;
    default:
      return action;
  }
};

export type ActionKeys = keyof typeof claimsMessages.actions;

export const subjectResolver = (action: ActionKeys, subject: string) => {
  switch (subject) {
    case AbilitySubjects.User:
      return claimsMessages.subject[action].user;
    case AbilitySubjects.Role:
      return claimsMessages.subject[action].role;
    case AbilitySubjects.Claim:
      return claimsMessages.subject[action].claim;
    case AbilitySubjects.Worker:
      return claimsMessages.subject[action].worker;
    case AbilitySubjects.Invite:
      return claimsMessages.subject[action].invite;
    case AbilitySubjects.Project:
      return claimsMessages.subject[action].project;
    case AbilitySubjects.Activity:
      return claimsMessages.subject[action].activity;
    case AbilitySubjects.TimeReport:
      return claimsMessages.subject[action].timeReport;
    case AbilitySubjects.MonthlyTimeReview:
      return claimsMessages.subject[action].monthTimeReview;
    default:
      return subject;
  }
};

export class Claim {
  @TableField(claimsMessages.claim.id)
  public id!: number;
  @TableField(claimsMessages.claim.action, actionResolver)
  public action!: string;
  @TableField(claimsMessages.claim.subject)
  public subject!: string;
  public condition?: string;
}
