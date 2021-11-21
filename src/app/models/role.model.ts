import { Claim } from './claim.model';

export class Role {
  id!: number;
  name!: string;
  claims?: Claim[];
}
