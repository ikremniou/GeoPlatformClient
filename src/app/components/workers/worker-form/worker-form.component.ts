import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntityForm } from 'src/app/misc/entity-form';
import { EntityFormData } from 'src/app/misc/entity-form-data';
import { Worker } from 'src/app/models/worker.model';

@Component({
  selector: 'app-worker-form',
  templateUrl: './worker-form.component.html',
  styleUrls: ['./worker-form.component.sass']
})
export class WorkersFormComponent implements OnInit, EntityForm<Worker> {
  @Input('formData')
  public formData!: EntityFormData<Worker>;

  public workerForm!: FormGroup;

  constructor() { }

  public isValid(): boolean {
    return this.workerForm.valid;
  }

  public getEntity(): Worker {
    return { id: this.formData.model?.id, ...this.workerForm.value };
  }

  public ngOnInit(): void {
    this.workerForm = new FormGroup({
      lastName: new FormControl(this.formData.model?.lastName, [Validators.required]),
      firstName: new FormControl(this.formData.model?.firstName, [Validators.required]),
      middleName: new FormControl(this.formData.model?.middleName, [Validators.required]),
    });
  }
}
