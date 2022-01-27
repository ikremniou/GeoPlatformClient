import { workerPositionsMessages } from 'src/app/components/workers-hub/positions/locale';
import { TableEntity } from 'src/app/misc/data-table/entity-decorator';
import { TableField } from 'src/app/misc/data-table/field-decorator';

const baseSalaryView = (baseSalary: number) => {
  return `${baseSalary} ${workerPositionsMessages.baseSalarySign}`;
}

@TableEntity({ displayName: workerPositionsMessages.modelName })
export class WorkerPosition {
  @TableField(workerPositionsMessages.model.id)
  id!: number;
  @TableField(workerPositionsMessages.model.name)
  name!: string;
  @TableField(workerPositionsMessages.model.baseSalary, baseSalaryView)
  baseSalary!: number;
}