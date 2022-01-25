import { modelLocaleStrings } from '../local-locale';
import { TableEntity } from '../misc/data-table/entity-decorator';
import { TableField } from '../misc/data-table/field-decorator';

@TableEntity({ displayName: modelLocaleStrings.worker._.name })
export class Worker {
    @TableField(modelLocaleStrings.worker.id)
    id!: number;
    @TableField(modelLocaleStrings.worker.firstName)
    firstName!: string;
    @TableField(modelLocaleStrings.worker.lastName)
    lastName!: string;
    @TableField(modelLocaleStrings.worker.middleName)
    middleName!: string;
}
