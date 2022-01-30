import { Component, TemplateRef, ViewChild } from '@angular/core';
import { DataTableConsumer } from 'src/app/misc/data-table/data-table-consumer';
import { DataTableOptions } from 'src/app/misc/data-table/data-table-options';
import { DialogData } from 'src/app/misc/entity-dialog-data';
import { WorkClient } from 'src/app/models/client/work-client.model';
import { WorkerCategory } from 'src/app/models/worker-category/worker-category.model';
import { HeaderService } from 'src/app/services/header/header.service';
import { DialogService } from 'src/app/services/ui/dialog/dialog.service';
import { WorkClientService } from 'src/app/services/work-hub/work-client/work-client.service';
import { workClientMessages } from './locale';

@Component({
  selector: 'app-work-clients',
  templateUrl: './work-clients.component.html',
  styleUrls: ['./work-clients.component.sass'],
})
export class WorkClientsComponent implements DataTableConsumer<WorkClient> {
  public entity = WorkClient;
  public displayColumns: string[] = ['id', 'name', 'address', 'contactPhone', 'isActive'];
  public tableOptions: DataTableOptions = {
    actions: {
      add: true,
      delete: true,
      edit: true,
      view: true,
    },
  };
  @ViewChild('workClientForm')
  public workClientForm!: TemplateRef<any>;

  constructor(
    headerService: HeaderService,
    public readonly clientService: WorkClientService,
    private readonly _dialogService: DialogService,
  ) {
    headerService.changedHeader(workClientMessages.header);
  }

  public getAll(): Promise<WorkClient[]> {
    return this.clientService.getAll().toPromise();
  }

  public add(): Promise<WorkClient> {
    const dialogData: DialogData<WorkClient> = {
      form: {
        type: {
          isAdd: true,
        },
      },
      title: workClientMessages.addWorkClient,
    };

    return this._dialogService.open<WorkClient>(this.workClientForm, dialogData);
  }

  public edit(workClient: WorkClient): Promise<WorkClient> {
    const dialogData: DialogData<WorkClient> = {
      form: {
        type: {
          isEdit: true,
        },
        model: workClient,
      },
      title: workClientMessages.editWorkClient,
    };

    return this._dialogService.open<WorkClient>(this.workClientForm, dialogData);
  }

  public async view(workClient: WorkClient): Promise<void> {
    const dialogData: DialogData<WorkClient> = {
      form: {
        type: {
          isView: true,
        },
        model: workClient,
      },
      title: workClientMessages.viewWorkClient,
    };

    await this._dialogService.open<WorkClient>(this.workClientForm, dialogData);
  }

  public async delete(workClient: WorkClient): Promise<void> {
    await this.clientService.delete(workClient).toPromise();
  }
}
