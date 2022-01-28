export class CreateWorker {
  firstName!: string;
  lastName!: string;
  middleName!: string;
  birthday!: Date;
  mobilePhone?: string;
  homePhone?: string;
  hiredDate!: Date;
  firedDate?: Date;
  workNorm!: number;
  boostFactor!: number;
  workerPositionId!: number;
  workerCategoryId!: number;
}