import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataTableConsumer } from 'src/app/misc/data-table/data-table-consumer';
import { DataTableOptions } from 'src/app/misc/data-table/data-table-options';
import { DialogData } from 'src/app/misc/entity-dialog-data';
import { Invite } from 'src/app/models/invite/invitation.model';
import { HeaderService } from 'src/app/services/header/header.service';
import { InvitationService } from 'src/app/services/invitation/invitation.service';
import { Worker } from 'src/app/models/worker/worker.model';
import { Router } from '@angular/router';
import { invitationMessages } from './locale/ru/invitation-messages.ru';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.sass'],
})
export class InvitationsComponent implements DataTableConsumer<Invite> {
  @ViewChild('invitationForm')
  public invitationForm!: TemplateRef<any>;
  @ViewChild('workerView')
  public workerView!: TemplateRef<any>;

  public entity = Invite;
  public displayColumns = ['id', 'worker'];
  public tableOptions: DataTableOptions = { actions: { delete: true, add: true, view: true } };

  constructor(
    private readonly _router: Router,
    private readonly _matDialog: MatDialog,
    private readonly _headerService: HeaderService,
    public readonly invitationService: InvitationService,
  ) {
    this._headerService.changedHeader(invitationMessages.invitationsHeader);
  }

  public getAll(): Promise<Invite[]> {
    return this.invitationService.getAll().toPromise();
  }

  public add(): Promise<Invite> {
    const dialogData: DialogData<Invite> = {
      title: invitationMessages.addInvitation,
      form: {
        type: { isAdd: true },
      },
    };
    return this.openDialog(dialogData);
  }

  public async view(entity: Invite): Promise<void> {
    this._router.navigate(['register'], { queryParams: { invitation: entity.id } });
  }

  public openWorker(worker: Worker): void {
    const dialogData: DialogData<Worker> = {
      title: invitationMessages.viewInvitation,
      form: {
        type: { isView: true },
        model: worker,
      },
    };
    this._matDialog.open(this.workerView, { data: dialogData });
  }

  private openDialog(dialogData: DialogData<Invite>): Promise<Invite> {
    return new Promise<Invite>((resolve) => {
      this._matDialog
        .open(this.invitationForm, { data: dialogData })
        .afterClosed()
        .subscribe((responseEntity) => {
          resolve(responseEntity);
        });
    });
  }
}
