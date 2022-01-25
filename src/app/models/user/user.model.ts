import { TableField } from '../../misc/data-table/field-decorator';
import { modelLocaleStrings } from '../../local-locale';
import { TableEntity } from '../../misc/data-table/entity-decorator';

type UserStatus = 'active' | 'blocked';

function statusView(status: UserStatus): string {
    if (status === 'active') {
        return modelLocaleStrings.userModel.statusTypes.active;
    } else {
        return modelLocaleStrings.userModel.statusTypes.blocked;
    }
}

@TableEntity({ displayName: modelLocaleStrings.userModel._.name })
export class User {
  @TableField(modelLocaleStrings.userModel.id)
  public id!: number;
  @TableField(modelLocaleStrings.userModel.username)
  public username!: string;
  @TableField(modelLocaleStrings.userModel.email)
  public email!: string;
  @TableField(modelLocaleStrings.userModel.status, statusView)
  public status!: UserStatus;
}
