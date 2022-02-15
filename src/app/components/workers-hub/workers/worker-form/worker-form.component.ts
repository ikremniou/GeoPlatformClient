import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseFormComponent } from 'src/app/components/generic/base-form/base-form.components';
import { EntityFormData } from 'src/app/misc/entity-form-data';
import { WorkerCategory } from 'src/app/models/worker-category/worker-category.model';
import { WorkerPosition } from 'src/app/models/worker-position/worker-position.model';
import { CreateWorker } from 'src/app/models/worker/create-worker.model';
import { UpdateWorker } from 'src/app/models/worker/update-worker.model';
import { Worker } from 'src/app/models/worker/worker.model';
import { WorkerCategoryService } from 'src/app/services/worker/category/worker-category.service';
import { WorkerPositionService } from 'src/app/services/worker/position/worker-position.service';
import { workerConstants } from '../../worker.constants';
import { workerViewMessages } from '../locale/ru/worker-view-messages.ru';

@Component({
  selector: 'app-worker-form',
  templateUrl: './worker-form.component.html',
  styleUrls: ['./worker-form.component.sass'],
})
export class WorkersFormComponent extends BaseFormComponent<Worker, CreateWorker> implements OnInit {
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

  constructor(
    public readonly positionService: WorkerPositionService,
    public readonly categoryService: WorkerCategoryService,
  ) {
    super();
  }

  public isValid(): boolean {
    return this.workerForm.valid;
  }

  public getEntity(): Worker | CreateWorker | UpdateWorker {
    const entity: CreateWorker | UpdateWorker = {
      birthday: this.workerForm.value.birthday,
      boostFactor: this.workerForm.value.boostFactor,
      firstName: this.workerForm.value.firstName,
      hiredDate: this.workerForm.value.hiredDate,
      lastName: this.workerForm.value.lastName,
      middleName: this.workerForm.value.middleName,
      workNorm: this.workerForm.value.workNorm,
      workerCategoryId: this.workerForm.value.category.id,
      workerPositionId: this.workerForm.value.position.id,
      firedDate: this.workerForm.value.firedDate,
      homePhone: this.workerForm.value.homePhone,
      mobilePhone: this.workerForm.value.mobilePhone,
    };

    if (this.formData.type.isEdit) {
      (entity as UpdateWorker).id = this.formData.model!.id;
    }
    return entity;
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
        Validators.min(0),
      ]),
      boostFactor: new FormControl(this.formData.model?.boostFactor ?? workerConstants.defaultBoostFactor, [
        Validators.required,
        Validators.min(0),
      ]),
      category: new FormControl(this.formData.model?.category, [Validators.required]),
      position: new FormControl(this.formData.model?.position, [Validators.required]),
    });
    if (this.formData.type.isView) {
      this.workerForm.disable();
    }
  }

  public positionCategoryDisplay(categoryPosition: WorkerPosition | WorkerCategory): string {
    if (categoryPosition) {
      return categoryPosition.name;
    }
    return '';
  }
}
