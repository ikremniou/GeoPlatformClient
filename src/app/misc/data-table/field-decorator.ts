import { dataTableMetadataStore } from './metadata-store';

export function TableField(displayName: string, view?: (...value: any[]) => any) {
  return (classTarget: any, propertyKey: string) => {
    dataTableMetadataStore.addField(classTarget.constructor.name, { name: propertyKey, displayName, view });
  };
}
