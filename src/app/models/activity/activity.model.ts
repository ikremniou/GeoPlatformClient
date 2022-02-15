import { activityMessages } from 'src/app/components/projects-hub/activities/locale';
import { TableEntity } from 'src/app/misc/data-table/entity-decorator';
import { TableField } from 'src/app/misc/data-table/field-decorator';
import { Project } from '../projects/project.model';

@TableEntity({ displayName: activityMessages.modelName })
export class Activity {
    @TableField(activityMessages.model.id)
    id!: number;
    @TableField(activityMessages.model.summary)
    summary!: string;
    @TableField(activityMessages.model.description)
    description?: string;
    @TableField(activityMessages.model.project)
    project!: Project;
}
