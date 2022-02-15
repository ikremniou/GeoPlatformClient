import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Constants } from 'src/app/app.constants';
import { DataTableConsumer } from 'src/app/misc/data-table/data-table-consumer';
import { DataTableOptions } from 'src/app/misc/data-table/data-table-options';
import { DialogData } from 'src/app/misc/entity-dialog-data';
import { ActionKeys, actionResolver, Claim, subjectResolver } from 'src/app/models/claim.model';
import { Role } from 'src/app/models/role/role.model';
import { HeaderService } from 'src/app/services/header/header.service';
import { RoleService } from 'src/app/services/role/role.service';
import { rolesMessages } from './locale';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.sass'],
})
export class RolesComponent implements DataTableConsumer<Role> {
  @ViewChild('rolesForm')
  public rolesForm!: TemplateRef<any>;
  public entity = Role;
  public displayColumns = ['id', 'name', 'claims'];
  public tableOptions: DataTableOptions = {
    actions: {
      add: true,
      delete: true,
      edit: true,
      view: true,
    },
  };

  constructor(
    public readonly roleService: RoleService,
    private readonly _dialog: MatDialog,
    private readonly _headerService: HeaderService,
  ) {
    this._headerService.changedHeader(rolesMessages.header);
  }

  public getAll(): Promise<Role[]> {
    return this.roleService.getAll().toPromise();
  }

  public claimToChip(claim: Partial<Claim>): string {
    const subject = subjectResolver(claim.action as ActionKeys, claim.subject!);
    const action = actionResolver(claim.action as ActionKeys);

    return [rolesMessages.can, action, subject].join(' | ');
  }

  public add(): Promise<Role> {
    const dialogData: DialogData<Role> = {
      title: rolesMessages.addRoleTitle,
      form: {
        type: {
          isAdd: true,
        },
      },
    };

    return this._dialog.open(this.rolesForm, { data: dialogData }).afterClosed().toPromise();
  }

  public edit(role: Role): Promise<Role> {
    const dialogData: DialogData<Role> = {
      title: rolesMessages.editRoleTitle,
      form: {
        type: {
          isEdit: true,
        },
        model: role,
      },
    };

    return this._dialog.open(this.rolesForm, { data: dialogData }).afterClosed().toPromise();
  }

  public view(role: Role): Promise<void> {
    const dialogData: DialogData<Role> = {
      title: rolesMessages.viewRoleTitle,
      form: {
        type: {
          isView: true,
        },
        model: role,
      },
    };
    return this._dialog.open(this.rolesForm, { data: dialogData }).afterClosed().toPromise();
  }

  public async delete(role: Role): Promise<void> {
    await this.roleService.delete(role).toPromise();
  }

  public isAdminEntry(role: Role): boolean {
    return role.name === Constants.AdminRoleName;
  }
}
