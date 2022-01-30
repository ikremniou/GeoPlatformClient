import { workClientMessages } from 'src/app/components/projects-hub/clients/locale';
import { TableEntity } from 'src/app/misc/data-table/entity-decorator';
import { TableField } from 'src/app/misc/data-table/field-decorator';

const isActiveView = (isActive: boolean) => {
  if (isActive) {
    return workClientMessages.isActiveTrue;
  }
  return workClientMessages.isActiveFalse;
}

@TableEntity({ displayName: workClientMessages.modelName })
export class WorkClient {
  @TableField(workClientMessages.model.id)
  id!: number;
  @TableField(workClientMessages.model.name)
  name!: string;
  @TableField(workClientMessages.model.address)
  address!: string;
  @TableField(workClientMessages.model.contactPhone)
  contactPhone!: string;
  @TableField(workClientMessages.model.isActive, isActiveView)
  isActive!: boolean;
}
