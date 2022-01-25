import { workerCategoriesMessages } from 'src/app/components/workers-hub/categories/locale';
import { TableEntity } from 'src/app/misc/data-table/entity-decorator';
import { TableField } from 'src/app/misc/data-table/field-decorator';

@TableEntity({displayName: workerCategoriesMessages.modelName })
export class WorkerCategory {
    @TableField(workerCategoriesMessages.model.id)
    id!: number;
    @TableField(workerCategoriesMessages.model.name)
    name!: string;
}
