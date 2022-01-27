import { workerViewMessages } from 'src/app/components/workers-hub/workers/locale/ru/worker-view-messages.ru';
import { TableEntity } from '../../misc/data-table/entity-decorator';
import { TableField } from '../../misc/data-table/field-decorator';
import { WorkerCategory } from '../worker-category/worker-category.model';
import { WorkerPosition } from '../worker-position/worker-position.model';

@TableEntity({ displayName: workerViewMessages.modelName })
export class Worker {
  @TableField(workerViewMessages.model.id)
  id!: number;
  @TableField(workerViewMessages.model.firstName)
  firstName!: string;
  @TableField(workerViewMessages.model.lastName)
  lastName!: string;
  @TableField(workerViewMessages.model.middleName)
  middleName!: string;
  @TableField(workerViewMessages.model.birthday)
  birthday!: Date;
  @TableField(workerViewMessages.model.mobilePhone)
  mobilePhone?: string;
  @TableField(workerViewMessages.model.homePhone)
  homePhone?: string;
  @TableField(workerViewMessages.model.hiredDate)
  hiredDate!: Date;
  @TableField(workerViewMessages.model.firedDate)
  firedDate?: Date;
  @TableField(workerViewMessages.model.workNorm)
  workNorm!: number;
  @TableField(workerViewMessages.model.boostFactor)
  boostFactor!: number;
  @TableField(workerViewMessages.model.position)
  position!: WorkerPosition;
  @TableField(workerViewMessages.model.category)
  category!: WorkerCategory;
}
