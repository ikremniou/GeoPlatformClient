export interface EntityFormData<EntityType> {
    type: {
        isEdit?: boolean,
        isView?: boolean,
        isAdd?: boolean
    }
    model?: EntityType;
}