import { workerCategoryMessages } from 'src/app/components/workers-hub/categories/locale';
import { TableEntity } from 'src/app/misc/data-table/entity-decorator';
import { TableField } from 'src/app/misc/data-table/field-decorator';

@TableEntity({displayName: workerCategoryMessages.modelName })
export class WorkerCategory {
    @TableField(workerCategoryMessages.model.id)
    id!: number;
    @TableField(workerCategoryMessages.model.name)
    name!: string;
}
