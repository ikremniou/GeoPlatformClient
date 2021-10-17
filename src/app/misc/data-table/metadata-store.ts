export interface DataTableField {
    name: string;
    displayName: string;
    view?: (value: any) => any;
}

export interface EntityMetadata {
    displayName: string;
}


export interface DataTableMetadataStore {
    getEntityMetadata(name: string): EntityMetadata | undefined;
    setEntityMetadata(name: string, metadata: EntityMetadata): void
    addField(className: string, field: DataTableField): void;
    getFields(className: string): DataTableField[] | undefined;
}

class DataTableMetadataStoreImpl implements DataTableMetadataStore {
    private entityMetadata = new Map<string, EntityMetadata>();
    private fields = new Map<string, DataTableField[]>();

    public addField(className: string, field: DataTableField): void {
        const classFields = this.fields.get(className);
        if (!classFields) {
            this.fields.set(className, [field]);
            return;
        }
        classFields.push(field);
    }

    public getEntityMetadata(name: string): EntityMetadata | undefined {
        return this.entityMetadata.get(name);
    }

    public setEntityMetadata(name: string, metadata: EntityMetadata): void {
        this.entityMetadata.set(name, metadata);
    }

    public getFields(className: string): DataTableField[] | undefined { 
        return this.fields.get(className);
    }

}


export const dataTableMetadataStore: DataTableMetadataStore = new DataTableMetadataStoreImpl();