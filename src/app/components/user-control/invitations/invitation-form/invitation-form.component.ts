import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { EntityForm } from 'src/app/misc/entity-form';
import { EntityFormData } from 'src/app/misc/entity-form-data';
import { Invite } from 'src/app/models/invite/invitation.model';
import { WorkerService } from 'src/app/services/worker/worker.service';
import { Worker } from 'src/app/models/worker/worker.model';
import { CreateInvitation } from 'src/app/models/invite/create-invitation.model';

@Component({
  selector: 'app-invitation-form',
  templateUrl: './invitation-form.component.html',
  styleUrls: ['./invitation-form.component.sass'],
})
export class InvitationFormComponent implements OnInit, EntityForm<Invite, CreateInvitation> {
  public workerFilterParts = ['lastName', 'firstName', 'middleName'];
  @Input('formData')
  public formData!: EntityFormData<Invite>;
  public invitationForm!: FormGroup;

  constructor(public readonly dataService: WorkerService) {
    this.invitationForm = new FormGroup({
      worker: new FormControl(undefined, [Validators.required]),
    });
  }

  get workerSelectControl(): FormControl {
    return this.invitationForm.get('worker') as FormControl;
  }

  public isValid(): boolean {
    return this.invitationForm.valid;
  }

  public getEntity(): Invite | CreateInvitation {
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
