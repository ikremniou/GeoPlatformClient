import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntityForm } from 'src/app/misc/entity-form';
import { EntityFormData } from 'src/app/misc/entity-form-data';
import { WorkerCategory } from 'src/app/models/worker-category/worker-category.model';
import { workerConstants } from '../../worker.constants';

@Component({
  selector: 'app-worker-category-form',
  templateUrl: './worker-category-form.component.html',
  styleUrls: ['./worker-category-form.component.sass'],
})
export class WorkerCategoryFormComponent implements OnInit, EntityForm<WorkerCategory> {
  @Input('formData')
  public formData!: EntityFormData<WorkerCategory>;
  public maxNameLength = workerConstants.categories.maxNameLength;

  public categoryForm: FormGroup = new FormGroup({
    name: new FormControl(undefined, [Validators.required, Validators.maxLength(this.maxNameLength)]),
  });

  public ngOnInit(): void {
    this.categoryForm = new FormGroup({
      name: new FormControl(this.formData.model?.name, [Validators.required, Validators.maxLength(this.maxNameLength)]),
    });
  }

  public isValid(): boolean {
    return this.categoryForm.valid;
  }

  public getEntity(): WorkerCategory {
    return { id: this.formData.model?.id, ...this.categoryForm.value };
  }
}
