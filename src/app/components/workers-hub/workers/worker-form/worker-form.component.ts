import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntityForm } from 'src/app/misc/entity-form';
import { EntityFormData } from 'src/app/misc/entity-form-data';
import { Worker } from 'src/app/models/worker/worker.model';
import { workerConstants } from '../../worker.constants';
import { workerViewMessages } from '../locale/ru/worker-view-messages.ru';

@Component({
  selector: 'app-worker-form',
  templateUrl: './worker-form.component.html',
  styleUrls: ['./worker-form.component.sass'],
})
export class WorkersFormComponent implements OnInit, EntityForm<Worker> {
  public localMobilePrefix = workerViewMessages.mobilePrefix;
  public localMobileMask = workerViewMessages.mobileMask;
  public maxFirstNameLength = workerConstants.maxFirstNameLength;
  public maxMiddleNameLength = workerConstants.maxMiddleNameLength;
  public maxLastNameLength = workerConstants.maxLastNameLength;
  public maxHomePhoneLength = workerConstants.maxHomePhoneLength;
  public currentDate = new Date();
  public maxBirthday = new Date(
    this.currentDate.getFullYear() - workerConstants.minHireAge,
    this.currentDate.getMonth(),
    this.currentDate.getDate(),
  );
  public minBirthday = new Date(
    this.currentDate.getFullYear() - workerConstants.maxHireAge,
    this.currentDate.getMonth(),
    this.currentDate.getDate(),
  );
  public minHiredDate = new Date(
    workerConstants.minPlatformHiredYear,
    this.currentDate.getMonth(),
    this.currentDate.getDate(),
  );

  @Input('formData')
  public formData!: EntityFormData<Worker>;

  public workerForm!: FormGroup;

  constructor() {}

  public isValid(): boolean {
    return this.workerForm.valid;
  }

  public getEntity(): Worker {
    return {
      id: this.formData.model?.id,
      ...this.workerForm.value,
      mobilePhone: `${this.localMobilePrefix}${this.workerForm.value.mobilePhone}`,
    };
  }

  public ngOnInit(): void {
    this.workerForm = new FormGroup({
      lastName: new FormControl(this.formData.model?.lastName, [
        Validators.required,
        Validators.maxLength(this.maxLastNameLength),
      ]),
      firstName: new FormControl(this.formData.model?.firstName, [
        Validators.required,
        Validators.maxLength(this.maxFirstNameLength),
      ]),
      middleName: new FormControl(this.formData.model?.middleName, [
        Validators.required,
        Validators.maxLength(this.maxMiddleNameLength),
      ]),
      birthday: new FormControl(this.formData.model?.birthday, [Validators.required]),
      mobilePhone: new FormControl(this.formData.model?.mobilePhone),
      homePhone: new FormControl(this.formData.model?.homePhone, [Validators.maxLength(this.maxHomePhoneLength)]),
      hiredDate: new FormControl(this.formData.model?.hiredDate, [Validators.required]),
      firedDate: new FormControl(this.formData.model?.firedDate),
      workNorm: new FormControl(this.formData.model?.workNorm ?? workerConstants.defaultWorkNorm, [
        Validators.required,
      ]),
      boostFactor: new FormControl(this.formData.model?.boostFactor ?? workerConstants.defaultBoostFactor, [
        Validators.required,
      ]),
    });
  }
}
