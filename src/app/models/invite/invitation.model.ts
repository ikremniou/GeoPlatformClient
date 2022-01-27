import { invitationMessages } from 'src/app/components/user-control/invitations/locale/ru/invitation-messages.ru';
import { TableEntity } from '../../misc/data-table/entity-decorator';
import { TableField } from '../../misc/data-table/field-decorator';

@TableEntity({ displayName: invitationMessages.modelName })
export class Invite {
  @TableField(invitationMessages.model.id)
  id!: string;
}
