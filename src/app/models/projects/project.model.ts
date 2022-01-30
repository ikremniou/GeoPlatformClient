import { projectMessages } from 'src/app/components/projects-hub/projects/locale';
import { TableEntity } from 'src/app/misc/data-table/entity-decorator';
import { TableField } from 'src/app/misc/data-table/field-decorator';
import { Activity } from '../activity.model';
import { WorkClient } from '../client/work-client.model';

@TableEntity({ displayName: projectMessages.modelName })
export class Project {
  @TableField(projectMessages.model.id)
  id!: number;
  @TableField(projectMessages.model.name)
  name!: string;
  @TableField(projectMessages.model.summary)
  summary?: string;
  @TableField(projectMessages.model.startDate)
  startDate!: Date;
  @TableField(projectMessages.model.endDate)
  endDate!: Date;
  @TableField(projectMessages.model.client)
  client!: WorkClient;
  @TableField(projectMessages.model.executor)
  executor!: WorkClient;
  @TableField(projectMessages.model.responsible)
  responsible!: Worker;

  activities!: Activity[];
}
