export class CreateProject {
  summary!: string;
  description?: string;
  startDate!: Date;
  endDate!: Date;
  executorId!: number;
  clientId!: number;
  responsibleWorkerId!: number;
}
