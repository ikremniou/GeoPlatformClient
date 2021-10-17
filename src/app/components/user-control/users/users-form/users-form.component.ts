import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EntityForm } from 'src/app/components/generic/entity-dialog/entity-dialog.component';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.sass'],
})
export class UsersFormComponent implements OnInit, EntityForm<UserModel> {
  @Input('userModel')
  public userModel?: UserModel;
  public userForm!: FormGroup;

  constructor() {}

  public getEntity(): UserModel {
    return { id: this.userModel?.id, ...this.userForm.value };
  }

  public isValid(): boolean {
    return this.userForm?.valid || false;
  }

  public ngOnInit(): void {
    this.userForm = new FormGroup({
      username: new FormControl(this.userModel?.username, [Validators.required]),
      email: new FormControl(this.userModel?.email, [Validators.required]),
      status: new FormControl(this.userModel?.status, [Validators.required]),
    });
  }
}
