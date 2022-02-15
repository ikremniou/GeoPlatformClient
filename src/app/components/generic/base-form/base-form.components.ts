import { EntityForm } from 'src/app/misc/entity-form';
import { EntityFormData } from 'src/app/misc/entity-form-data';

export abstract class BaseFormComponent<T, Y = T, U = T> implements EntityForm<T, Y, U> {
  abstract formData: EntityFormData<T>;
  abstract isValid(): boolean;
  abstract getEntity(): T | Y | U;
  public isOptionalVisible(name: keyof T): boolean {
    if (this.formData.type.isView && !this.formData.model?.[name]) {
      return false;
    }
    return true;
  }
}
