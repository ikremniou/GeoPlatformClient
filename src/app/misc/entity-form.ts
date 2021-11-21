export interface EntityForm<EntityType, CreateEntityModel = EntityType, UpdateEntityModel = EntityType> {
  isValid(): boolean;
  getEntity(): EntityType | CreateEntityModel | UpdateEntityModel;
}