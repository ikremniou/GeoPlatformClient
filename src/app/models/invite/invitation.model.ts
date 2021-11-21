import { modelLocaleStrings } from '../../local-locale';
import { TableEntity } from '../../misc/data-table/entity-derator';
import { TableField } from '../../misc/data-table/field-decorator';

@TableEntity({ displayName: modelLocaleStrings.invitation._.name})
export class Invitation {
  @TableField('Идентификатор')
  id!: string;
}
