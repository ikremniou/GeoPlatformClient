import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntityForm } from 'src/app/misc/entity-form';
import { EntityFormData } from 'src/app/misc/entity-form-data';
import { WorkClient } from 'src/app/models/client/work-client.model';
import { Worker } from 'src/app/models/worker/worker.model';
import { CreateProject } from 'src/app/models/projects/create-project.model';
import { Project } from 'src/app/models/projects/project.model';
import { UpdateProject } from 'src/app/models/projects/update-project.model';
import { projectFormConstants } from './project-form.constants';
import { WorkerService } from 'src/app/services/worker/worker.service';
import { WorkClientService } from 'src/app/services/work-hub/work-client/work-client.service';
import { BaseFormComponent } from 'src/app/components/generic/base-form/base-form.components';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.sass'],
})
export class ProjectFormComponent extends BaseFormComponent<Project, CreateProject, UpdateProject> implements OnInit {
  @Input()
  public formData!: EntityFormData<Project>;
  public projectForm!: FormGroup;
  public maxDescriptionLength = projectFormConstants.maxDescriptionLength;
  public maxSummaryLength = projectFormConstants.maxSummaryLength;

  constructor(public readonly workerService: WorkerService, public readonly clientService: WorkClientService) {
    super();
  }

  public isValid(): boolean {
    return this.projectForm.valid;
  }

  public getEntity(): Project | CreateProject | UpdateProject {
    const result: CreateProject = {
      summary: this.projectForm.value.summary,
      description: this.projectForm.value.description,
      startDate: this.projectForm.value.startDate,
      endDate: this.projectForm.value.endDate,
      clientId: this.projectForm.value.client.id,
      executorId: this.projectForm.value.executor.id,
      responsibleWorkerId: this.projectForm.value.responsible.id,
    };

    if (this.formData.type.isEdit) {
      (result as UpdateProject).id = this.formData.model!.id;
    }

    return result;
  }

  public ngOnInit(): void {
    this.projectForm = new FormGroup({
      summary: new FormControl(this.formData.model?.summary, [
        Validators.required,
        Validators.maxLength(this.maxSummaryLength),
      ]),
      description: new FormControl(this.formData.model?.description, [Validators.maxLength(this.maxDescriptionLength)]),
      startDate: new FormControl(this.formData.model?.startDate, [Validators.required]),
      endDate: new FormControl(this.formData.model?.endDate),
      executor: new FormControl(this.formData.model?.executor, [Validators.required]),
      client: new FormControl(this.formData.model?.client, [Validators.required]),
      responsible: new FormControl(this.formData.model?.responsible, [Validators.required]),
    });

    if (this.formData.type.isView) {
      this.projectForm.disable();
    }
  }

  public workClientDisplay(client: WorkClient): string {
    if (client) {
      return client.name;
    }
    return '';
  }

  public workerDisplay(worker: Worker): string {
    if (worker) {
      return `${worker.lastName} ${worker.firstName} ${worker.middleName}`;
    }
    return '';
  }
}
