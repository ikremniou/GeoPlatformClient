export interface DataTableConsumer<EntityModel> {
    getAll(): Promise<EntityModel[]>;
    edit?(entity: EntityModel): Promise<EntityModel>;
    view?(entity: EntityModel): Promise<EntityModel>;
    delete?(entity: EntityModel): Promise<EntityModel>;
}