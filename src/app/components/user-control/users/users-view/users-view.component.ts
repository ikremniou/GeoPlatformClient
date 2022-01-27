import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataTableConsumer } from 'src/app/misc/data-table/data-table-consumer';
import { DataTableOptions } from 'src/app/misc/data-table/data-table-options';
import { DialogData } from 'src/app/misc/entity-dialog-data';
import { User } from 'src/app/models/user/user.model';
import { HeaderService } from 'src/app/services/header/header.service';
import { UserService } from 'src/app/services/user/user.service';
import { userMessages } from '../locale/ru/user-messages.ru';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.sass'],
})
export class UsersViewComponent implements OnInit, DataTableConsumer<User> {
  @ViewChild('editUser') public editUserRef!: TemplateRef<any>;
  public entity = User;
  public displayColumns: string[] = ['id', 'username', 'email', 'status'];
  public dataTableOptions: DataTableOptions = { actions: { edit: true } };

  constructor(
    public readonly userService: UserService,
    private readonly _dialog: MatDialog,
    private readonly _headerService: HeaderService,
  ) {
    this._headerService.changedHeader(userMessages.usersHeader);
  }

  public ngOnInit(): void {}

  public getAll(): Promise<User[]> {
    return this.userService.getAll().toPromise();
  }

  public async edit(entityModel: User): Promise<User> {
    return new Promise<User>((resolve) => {
      const dialogData: DialogData<User> = {
        title: userMessages.editUser,
        form: {
          model: entityModel,
          type: { isEdit: true },
        },
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
