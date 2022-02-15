import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EntityForm } from 'src/app/misc/entity-form';
import { EntityFormData } from 'src/app/misc/entity-form-data';
import { CreateTimeReport } from 'src/app/models/time-report/create-time-report.model';
import { TimeReport } from 'src/app/models/time-report/time-report.model';
import { UpdateTimeReport } from 'src/app/models/time-report/update-time-report.model';

@Component({
  selector: 'app-time-report-form',
  templateUrl: './time-report-form.component.html',
  styleUrls: ['./time-report-form.component.sass'],
})
export class TimeReportFormComponent implements OnInit, EntityForm<TimeReport, CreateTimeReport, UpdateTimeReport> {
  @Input()
  public formData!: EntityFormData<TimeReport>;
  public formGroup!: FormGroup;

  constructor() {}

  public isValid(): boolean {
    return this.formGroup.valid;
  }
  public getEntity(): TimeReport | CreateTimeReport | UpdateTimeReport {
    throw new Error('Method not implemented.');
  }

  public ngOnInit(): void {
    this.formGroup = new FormGroup({});
  }
}
