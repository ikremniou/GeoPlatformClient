export interface DataTableConsumer<EntityModel> {
    getAll(): Promise<EntityModel[]>;
    add?(): Promise<EntityModel>;
    edit?(entity: EntityModel): Promise<EntityModel>;
    view?(entity: EntityModel): Promise<void>;
    delete?(entity: EntityModel): Promise<void>;
}