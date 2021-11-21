import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EntityForm } from 'src/app/misc/entity-form';
import { EntityFormData } from 'src/app/misc/entity-form-data';
import { Invitation } from 'src/app/models/invite/invitation.model';
import { WorkerService } from 'src/app/services/worker/worker.service';
import { Worker } from 'src/app/models/worker.model';
import { CreateInvitation } from 'src/app/models/invite/create-invitation.model';

@Component({
  selector: 'app-invitation-form',
  templateUrl: './invitation-form.component.html',
  styleUrls: ['./invitation-form.component.sass'],
})
export class InvitationFormComponent implements OnInit, EntityForm<Invitation, CreateInvitation> {
  public workerFilterParts = ['lastName', 'firstName', 'middleName'];
  @Input('formData')
  public formData!: EntityFormData<Invitation>;
  public invitationForm!: FormGroup;

  constructor(public readonly dataService: WorkerService) {
    this.invitationForm = new FormGroup({
      worker: new FormControl(),
    });
  }

  public isValid(): boolean {
    return this.invitationForm.valid;
  }

  public getEntity(): Invitation | CreateInvitation {
    if (this.formData.type.isAdd) {
      return { workerId: this.invitationForm.value.worker.id };
    }
    return { id: this.formData.model?.id, ...this.invitationForm.value };
  }

  public ngOnInit(): void {}

  public displayWorker(worker: Worker): string {
    if (worker) {
      return `${worker.lastName} ${worker.firstName} ${worker.middleName}`;
    }
    return '';
  }
}
