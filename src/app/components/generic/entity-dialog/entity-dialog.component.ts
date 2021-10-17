import { AfterViewInit, Component, ContentChild, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { DataService } from 'src/app/misc/service/data-service';
import { UsersFormComponent } from '../../user-control/users/users-form/users-form.component';

export interface DialogData<EntityType> {
  type: 'edit' | 'add' | 'view',
  title?: string;
  entity?: EntityType
}

export interface EntityForm<EntityType> {
  isValid(): boolean;
  getEntity(): EntityType;
}

@Component({
  selector: 'app-entity-dialog',
  templateUrl: './entity-dialog.component.html',
  styleUrls: ['./entity-dialog.component.sass'],
})
export class EntityDialogComponent<EntityModel> {
  @ContentChild('formControl')
  public entityForm!: EntityForm<EntityModel>;

  @Input('dialog-ref')
  public dialogRef!: MatDialogRef<any>;
  @Input('dialog-data')
  public dialogData!: DialogData<EntityModel>;
  @Input('data-service')
  public dataService!: DataService<EntityModel>;

  public async onSubmitEdit(): Promise<void> {
    if (this.entityForm.isValid()) {
      const entity = this.entityForm.getEntity();
      const patchedEntity = await this.dataService.patch?.(entity).toPromise();
      this.dialogRef.close(patchedEntity);
    }
  }

  public async onSubmitAdd(): Promise<void> {
    if (this.entityForm.isValid()) {
      const entity = this.entityForm.getEntity();
      const addedEntity = await this.dataService.add?.(entity).toPromise();
      this.dialogRef.close(addedEntity);
    }
  }

  public onDialogCancel(): void {
    this.dialogRef.close();
  }
}
