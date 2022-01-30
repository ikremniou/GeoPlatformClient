import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntityForm } from 'src/app/misc/entity-form';
import { EntityFormData } from 'src/app/misc/entity-form-data';
import { CreateWorkClient } from 'src/app/models/client/create-work-client.model';
import { UpdateWorkClient } from 'src/app/models/client/update-work-client.model';
import { WorkClient } from 'src/app/models/client/work-client.model';
import { workClientFormConstants } from './work-client-form.constants';

@Component({
  selector: 'app-work-client-form',
  templateUrl: './work-client-form.component.html',
  styleUrls: ['./work-client-form.component.sass'],
})
export class WorkClientFormComponent implements OnInit, EntityForm<WorkClient, CreateWorkClient, UpdateWorkClient> {
  public maxNameLength = workClientFormConstants.nameMaxLength;
  public maxAddressLength = workClientFormConstants.maxAddressLength;
  public maxPhoneLength = workClientFormConstants.maxPhoneLength;

  @Input()
  public formData!: EntityFormData<WorkClient>;
  public workClientGroup!: FormGroup;

  constructor() {}

  public isValid(): boolean {
    return this.workClientGroup.valid;
  }

  public getEntity(): WorkClient | CreateWorkClient | UpdateWorkClient {
    return {
      id: this.formData.model?.id,
      ...this.workClientGroup.value,
    };
  }

  public ngOnInit(): void {
    this.workClientGroup = new FormGroup({
      name: new FormControl(this.formData.model?.name, [Validators.required, Validators.maxLength(this.maxNameLength)]),
      address: new FormControl(this.formData.model?.address, [
        Validators.required,
        Validators.maxLength(this.maxAddressLength),
      ]),
      contactPhone: new FormControl(this.formData.model?.contactPhone, [
        Validators.required,
        Validators.maxLength(this.maxPhoneLength),
      ]),
      isActive: new FormControl(this.formData.model?.isActive)
    });
    if (this.formData.type.isView) {
      this.workClientGroup.disable();
    }
  }
}
