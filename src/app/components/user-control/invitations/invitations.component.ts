import { Component, OnInit } from '@angular/core';
import { localeMessages } from 'src/app/local-locale';
import { DataTableConsumer } from 'src/app/misc/data-table/data-table-consumer';
import { DataTableOptions } from 'src/app/misc/data-table/data-table-options';
import { Invitation } from 'src/app/models/invitation.model';
import { HeaderService } from 'src/app/services/header/header.service';
import { InvitationService } from 'src/app/services/invitation/invitation.service';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.sass'],
})
export class InvitationsComponent implements OnInit, DataTableConsumer<Invitation> {
  public entity = Invitation;
  public displayColumns = ['id'];
  public dataTableOptions: DataTableOptions = { actions: { delete: true, add: true } };

  constructor(
    private readonly _headerService: HeaderService,
    private readonly _invitationService: InvitationService) {
      this._headerService.changedHeader(localeMessages.headers.invitations)
    }

  ngOnInit(): void {}

  public getAll(): Promise<Invitation[]> {
    return this._invitationService.getAll().toPromise();
  }
}
