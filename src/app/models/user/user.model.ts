import { TableField } from '../../misc/data-table/field-decorator';
import { TableEntity } from '../../misc/data-table/entity-decorator';
import { userMessages } from 'src/app/components/user-control/users/locale/ru/user-messages.ru';

type UserStatus = 'active' | 'blocked';

function statusView(status: UserStatus): string {
    if (status === 'active') {
        return userMessages.statusTypes.active;
    } else {
        return userMessages.statusTypes.blocked;
    }
}

@TableEntity({ displayName: userMessages.modelName })
export class User {
  @TableField(userMessages.model.id)
  public id!: number;
  @TableField(userMessages.model.username)
  public username!: string;
  @TableField(userMessages.model.email)
  public email!: string;
  @TableField(userMessages.model.status, statusView)
  public status!: UserStatus;
}
