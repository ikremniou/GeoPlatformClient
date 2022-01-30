import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntityForm } from 'src/app/misc/entity-form';
import { EntityFormData } from 'src/app/misc/entity-form-data';
import { CreateProject } from 'src/app/models/projects/create-project.model';
import { Project } from 'src/app/models/projects/project.model';
import { UpdateProject } from 'src/app/models/projects/update-project.model';
import { projectFormConstants } from './project-form.constants';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.sass'],
})
export class ProjectFormComponent implements OnInit, EntityForm<Project, CreateProject, UpdateProject> {
  @Input()
  public formData!: EntityFormData<Project>;
  public projectForm!: FormGroup;
  public maxSummaryLength = projectFormConstants.maxSummaryLength;
  public maxNameLength = projectFormConstants.maxNameLength;

  public isValid(): boolean {
    return this.projectForm.valid;
  }

  public getEntity(): Project | CreateProject | UpdateProject {
    const result: CreateProject = {
      name: this.projectForm.value.name,
      summary: this.projectForm.value.summary,
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
      name: new FormControl(this.formData.model?.name, [Validators.required, Validators.maxLength(this.maxNameLength)]),
      summary: new FormControl(this.formData.model?.summary, [Validators.maxLength(this.maxSummaryLength)]),
      startDate: new FormControl(this.formData.model?.startDate, [Validators.required]),
      endDate: new FormControl(this.formData.model?.endDate, [Validators.required]),
      executor: new FormControl(this.formData.model?.executor, [Validators.required]),
      client: new FormControl(this.formData.model?.client, [Validators.required]),
      responsible: new FormControl(this.formData.model?.responsible, [Validators.required]),
    });
  }
}
