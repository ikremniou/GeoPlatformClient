import { Component, OnInit } from '@angular/core';
import { DataTableConsumer } from 'src/app/misc/data-table/data-table-consumer';
import { DataTableOptions } from 'src/app/misc/data-table/data-table-options';
import { Role } from 'src/app/models/role.model';
import { RoleService } from 'src/app/services/role/role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.sass']
})
export class RolesComponent implements DataTableConsumer<Role> {
  public entityClass = Role;
  public displayColumns = ['id', 'name'];
  public tableOptions: DataTableOptions = { };

  constructor(private _roleService: RoleService) { }
  public getAll(): Promise<Role[]> {
    return this._roleService.getAll().toPromise();
  }
}
