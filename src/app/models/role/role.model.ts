import { rolesMessages } from 'src/app/components/security/roles/locale';
import { TableEntity } from '../../misc/data-table/entity-decorator';
import { TableField } from '../../misc/data-table/field-decorator';
import { Claim } from '../claim.model';

const roleNameConverter = (role: string) => {
  if (role.toLowerCase() === 'admin') {
    return rolesMessages.adminRole
  }
  return role;
}

@TableEntity({ displayName: rolesMessages.name })
export class Role {
  @TableField(rolesMessages.model.id)
  id!: number;
  @TableField(rolesMessages.model.name, roleNameConverter)
  name!: string;
  @TableField(rolesMessages.model.claims)
  claims?: Claim[];
}

export class CreateRoleModel {
  name!: string;
  claims?: number[];
}