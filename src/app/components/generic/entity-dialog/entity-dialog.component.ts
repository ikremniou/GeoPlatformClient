import { Component, ContentChild, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { localeMessages } from 'src/app/local-locale';
import { DialogData } from 'src/app/misc/entity-dialog-data';
import { EntityForm } from 'src/app/misc/entity-form';
import { ServerError } from 'src/app/misc/errors/server-error';
import { DataService } from 'src/app/misc/service/data-service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-entity-dialog',
  templateUrl: './entity-dialog.component.html',
  styleUrls: ['./entity-dialog.component.sass'],
})
export class EntityDialogComponent<EntityModel, CreateEntityModel = EntityModel, UpdateEntityModel = EntityModel> {
  @ContentChild('formControl')
  public entityForm!: EntityForm<EntityModel, CreateEntityModel, UpdateEntityModel>;

  @Input('dialog-ref')
  public dialogRef!: MatDialogRef<any>;
  @Input('dialog-data')
  public dialogData!: DialogData<EntityModel>;
  @Input('data-service')
  public dataService!: DataService<EntityModel, CreateEntityModel, UpdateEntityModel>;

  constructor(private readonly _notification: NotificationService) {}

  public async onSubmitEdit(): Promise<void> {
    if (this.entityForm.isValid()) {
      try {
        const entity = this.entityForm.getEntity() as UpdateEntityModel;
        const patchedEntity = await this.dataService.patch?.(entity).toPromise();
        this.dialogRef.close(patchedEntity);
      } catch(error) {
        this.handleError(error);
        this.dialogRef.close();
      }
    }
  }

  public async onSubmitAdd(): Promise<void> {
    if (this.entityForm.isValid()) {
      try {
        const entity = this.entityForm.getEntity() as CreateEntityModel;
        const addedEntity = await this.dataService.add?.(entity).toPromise();
        this.dialogRef.close(addedEntity);
      } catch (error) {
        this.handleError(error);
        this.dialogRef.close();
      }
    }
  }

  public onDialogCancel(): void {
    this.dialogRef.close();
  }

  private handleError(err: any) {
    if (err instanceof ServerError) {
      this._notification.notifyError(err.message);
    } else {
      this._notification.notifyError(localeMessages.unknownError);
    }
  }
}
