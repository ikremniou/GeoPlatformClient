import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/components/generic/entity-dialog/entity-dialog.component';
import { localeMessages } from 'src/app/local-locale';
import { DataTableConsumer } from 'src/app/misc/data-table/data-table-consumer';
import { DataTableOptions } from 'src/app/misc/data-table/data-table-options';
import { UserModel } from 'src/app/models/user.model';
import { HeaderService } from 'src/app/services/header/header.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.sass'],
})
export class UsersViewComponent implements OnInit, DataTableConsumer<UserModel> {
  @ViewChild('editUser') public editUserRef!: TemplateRef<any>;
  public entity = UserModel;
  public displayColumns: string[] = ['id', 'username', 'email', 'status'];
  public dataTableOptions: DataTableOptions = { actions: { edit: true } };

  constructor(
    public readonly userService: UserService,
    private readonly _dialog: MatDialog,
    private readonly _headerService: HeaderService,
  ) {
    this._headerService.changedHeader(localeMessages.headers.users);
  }

  public ngOnInit(): void {}

  public getAll(): Promise<UserModel[]> {
    return this.userService.getAll().toPromise();
  }

  public async edit(entityModel: UserModel): Promise<UserModel> {
    return new Promise<UserModel>((resolve) => {
      const dialogData: DialogData<UserModel> = {
        type: 'edit',
        entity: entityModel,
        title: localeMessages.editUser,
      };
      this._dialog
        .open(this.editUserRef, { data: dialogData })
        .afterClosed()
        .subscribe((entity) => {
          resolve(entity);
        });
    });
  }
}
