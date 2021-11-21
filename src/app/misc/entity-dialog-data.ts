import { EntityFormData } from './entity-form-data';

export interface DialogData<EntityType> {
  title?: string;
  form: EntityFormData<EntityType>;
}
