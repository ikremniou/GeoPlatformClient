import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntityForm } from 'src/app/misc/entity-form';
import { EntityFormData } from 'src/app/misc/entity-form-data';
import { Activity } from 'src/app/models/activity/activity.model';
import { CreateActivity } from 'src/app/models/activity/create-activity.model';
import { UpdateActivity } from 'src/app/models/activity/update-activity.model';
import { Project } from 'src/app/models/projects/project.model';
import { ProjectService } from 'src/app/services/work-hub/project/project.service';
import { activityFormConstants } from './activity-form.constants';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.sass'],
})
export class ActivityFormComponent implements OnInit, EntityForm<Activity, CreateActivity, UpdateActivity> {
  @Input()
  public formData!: EntityFormData<Activity>;
  public activityForm!: FormGroup;
  public maxSummaryLength = activityFormConstants.maxSummaryLength;
  public maxDescriptionLength = activityFormConstants.maxDescriptionLength;

  constructor(public readonly projectService: ProjectService) {}

  public isValid(): boolean {
    return this.activityForm.valid;
  }

  public getEntity(): Activity | CreateActivity | UpdateActivity {
    let resultEntity: CreateActivity = {
      summary: this.activityForm.value.summary,
      projectId: this.activityForm.value.project.id,
      description: this.activityForm.value.description,
    };

    if (this.formData.type.isEdit) {
      (resultEntity as UpdateActivity).id = this.formData.model!.id;
    }

    return resultEntity;
  }

  public ngOnInit(): void {
    this.activityForm = new FormGroup({
      summary: new FormControl(this.formData.model?.summary, [Validators.required]),
      description: new FormControl(this.formData.model?.description, [Validators.maxLength(this.maxDescriptionLength)]),
      project: new FormControl(this.formData.model?.project, [Validators.required]),
    });

    if (this.formData.type.isView) {
      this.activityForm.disable();
    }
  }

  public projectDisplay(project: Project): string {
    if (project) {
      return project.summary;
    }
    return '';
  }
}
