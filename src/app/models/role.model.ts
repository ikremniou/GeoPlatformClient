import { rolesMessages } from '../components/security/locale';
import { modelLocaleStrings } from '../local-locale';
import { TableEntity } from '../misc/data-table/entity-decorator';
import { TableField } from '../misc/data-table/field-decorator';
import { Claim } from './claim.model';

const roleNameConverter = (role: string) => {
  if (role.toLowerCase() === 'admin') {
    return modelLocaleStrings.role._.admin;
  }
  return role;
}

@TableEntity({ displayName: rolesMessages.name })
export class Role {
  @TableField(modelLocaleStrings.role.id)
  id!: number;
  @TableField(modelLocaleStrings.role.name, roleNameConverter)
  name!: string;
  claims?: Claim[];
}

export class CreateRoleModel {
  name!: string;
  claims?: number[];
}