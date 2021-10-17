import { dataTableMetadataStore, EntityMetadata } from "./metadata-store";

export function TableEntity(metadata: EntityMetadata) {
  return (classTarget: any) => {
    dataTableMetadataStore.setEntityMetadata(classTarget.name, metadata);
  };
}