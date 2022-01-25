import { EntityFormData } from './entity-form-data';

export interface EntityForm<EntityType, CreateEntityModel = EntityType, UpdateEntityModel = EntityType> {
  formData: EntityFormData<EntityType>;
  isValid(): boolean;
  getEntity(): EntityType | CreateEntityModel | UpdateEntityModel;
}
