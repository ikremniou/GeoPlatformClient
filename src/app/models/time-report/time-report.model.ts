import { timeReportMessages } from 'src/app/components/time-hub/time-reports/locale';
import { TableEntity } from 'src/app/misc/data-table/entity-decorator';
import { TableField } from 'src/app/misc/data-table/field-decorator';
import { Activity } from '../activity/activity.model';
import { Worker } from '../worker/worker.model';

export const AbsentReason = {
  sick: 'sick',
  vacation: 'vacation',
  expense: 'expense',
  unknown: 'unknown',
  weekend: 'weekend',
};

export type AbsentReason = typeof AbsentReason[keyof typeof AbsentReason];

@TableEntity({ displayName: timeReportMessages.modelName })
export class TimeReport {
  @TableField(timeReportMessages.model.id)
  id!: number;
  @TableField(timeReportMessages.model.date)
  date!: Date;
  @TableField(timeReportMessages.model.norm)
  norm?: number;
  @TableField(timeReportMessages.model.bonus)
  bonus?: number;
  @TableField(timeReportMessages.model.penalty)
  penalty?: number;
  @TableField(timeReportMessages.model.combine)
  combine?: number;
  @TableField(timeReportMessages.model.travel)
  travel?: number;
  @TableField(timeReportMessages.model.absent)
  absent?: AbsentReason;
  @TableField(timeReportMessages.model.comment)
  comment?: string;
  @TableField(timeReportMessages.model.worker)
  worker!: Partial<Worker>;
  @TableField(timeReportMessages.model.activity)
  activity!: Partial<Activity>;
}
