import { AbsentReason } from './time-report.model';

export class CreateTimeReport {
  date!: Date;
  norm?: number;
  bonus?: number;
  penalty?: number;
  combine?: number;
  travel?: number;
  absent?: AbsentReason;
  comment?: string;
  activityId!: number;
  workerId!: number;
}
