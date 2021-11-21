import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntityForm } from 'src/app/misc/entity-form';
import { EntityFormData } from 'src/app/misc/entity-form-data';
import { UserModel } from 'src/app/models/user/user.model';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.sass'],
})
export class UsersFormComponent implements OnInit, EntityForm<UserModel> {
  @Input('formData')
  public formData!: EntityFormData<UserModel>;
  public userForm!: FormGroup;

  constructor() {}

  public getEntity(): UserModel {
    return { id: this.formData.model?.id, ...this.userForm.value };
  }

  public isValid(): boolean {
    return this.userForm.valid;
  }

  public ngOnInit(): void {
    this.userForm = new FormGroup({
      username: new FormControl(this.formData.model?.username, [Validators.required]),
      email: new FormControl(this.formData.model?.email, [Validators.required]),
      status: new FormControl(this.formData.model?.status, [Validators.required]),
    });
  }
}
