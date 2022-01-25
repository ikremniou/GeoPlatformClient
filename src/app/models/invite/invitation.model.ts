import { modelLocaleStrings } from '../../local-locale';
import { TableEntity } from '../../misc/data-table/entity-decorator';
import { TableField } from '../../misc/data-table/field-decorator';

@TableEntity({ displayName: modelLocaleStrings.invitation._.name})
export class Invite {
  @TableField('Идентификатор')
  id!: string;
}
