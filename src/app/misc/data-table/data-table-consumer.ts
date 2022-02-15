import { ClassConstructor } from "class-transformer";
import { DataTableOptions } from "./data-table-options";

export interface DataTableConsumer<EntityModel> {
    tableOptions: DataTableOptions;
    displayColumns: string[];
    entity: ClassConstructor<EntityModel>;

    getAll(): Promise<EntityModel[]>;
    add?(): Promise<EntityModel>;
    edit?(entity: EntityModel): Promise<EntityModel>;
    view?(entity: EntityModel): Promise<void>;
    delete?(entity: EntityModel): Promise<void>;
}