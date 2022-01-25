import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntityForm } from 'src/app/misc/entity-form';
import { EntityFormData } from 'src/app/misc/entity-form-data';
import { WorkerPosition } from 'src/app/models/worker-position/worker-position.model';
import { workerConstants } from '../../worker.constants';

@Component({
  selector: 'app-worker-position-form',
  templateUrl: './worker-position-form.component.html',
  styleUrls: ['./worker-position-form.component.sass'],
})
export class WorkerPositionFormComponent implements OnInit, EntityForm<WorkerPosition> {
  @Input('formData')
  public formData!: EntityFormData<WorkerPosition>;
  public positionForm!: FormGroup;
  public maxNameLength = workerConstants.positions.maxNameLength;

  public ngOnInit(): void {
    this.positionForm = new FormGroup({
      name: new FormControl(this.formData.model?.name, [Validators.required, Validators.maxLength(this.maxNameLength)]),
      baseSalary: new FormControl(this.formData.model?.baseSalary, [Validators.required, Validators.min(0)]),
    });
  }

  public isValid(): boolean {
    return this.positionForm.valid;
  }

  public getEntity(): WorkerPosition {
    return { id: this.formData.model?.id, ...this.positionForm.value };
  }
}
