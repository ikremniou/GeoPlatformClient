import { Component, TemplateRef, ViewChild } from '@angular/core';
import { DataTableConsumer } from 'src/app/misc/data-table/data-table-consumer';
import { DataTableOptions } from 'src/app/misc/data-table/data-table-options';
import { WorkerService } from 'src/app/services/worker/worker.service';
import { Worker } from 'src/app/models/worker/worker.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/misc/entity-dialog-data';
import { HeaderService } from 'src/app/services/header/header.service';
import { workerViewMessages } from './locale/ru/worker-view-messages.ru';

@Component({
  selector: 'app-workers-view',
  templateUrl: './workers-view.component.html',
  styleUrls: ['./workers-view.component.sass'],
})
export class WorkersViewComponent implements DataTableConsumer<Worker> {
  @ViewChild('workerForm')
  public workerFormTemplate!: TemplateRef<any>;
  public entity = Worker;
  public displayColumns = [
    'id',
    'lastName',
    'firstName',
    'middleName',
    'mobilePhone',
    'homePhone',
    'birthday',
    'hiredDate',
    'workNorm',
    'boostFactor',
    'position',
    'category'
  ];
  public tableOptions: DataTableOptions = {
    actions: {
      add: true,
      edit: true,
      view: true,
      delete: true,
    },
  };

  constructor(
    public readonly workerService: WorkerService,
    private readonly _matDialog: MatDialog,
    private readonly _headerService: HeaderService,
  ) {
    this._headerService.changedHeader(workerViewMessages.workersHeader);
  }
  public getAll(): Promise<Worker[]> {
    return this.workerService.getAll().toPromise();
  }

  public async view(entityModel: Worker): Promise<void> {
    const dialogData: DialogData<Worker> = {
      title: workerViewMessages.viewWorker,
      form: {
        type: { isView: true },
        model: entityModel,
      },
    };
    await this.openDialog(dialogData);
  }

  public edit(entityModel: Worker): Promise<Worker> {
    const dialogData: DialogData<Worker> = {
      title: workerViewMessages.editWorker,
      form: {
        type: { isEdit: true },
        model: entityModel,
      },
    };
    return this.openDialog(dialogData);
  }

  public add(): Promise<Worker> {
    const dialogData: DialogData<Worker> = {
      title: workerViewMessages.addWorker,
      form: {
        type: { isAdd: true },
      },
    };
    return this.openDialog(dialogData);
  }

  public async delete(entityModel: Worker): Promise<void> {
    await this.workerService.delete(entityModel).toPromise();
  }

  private openDialog(dialogData: DialogData<Worker>): Promise<Worker> {
    return new Promise<Worker>((resolve) => {
      this._matDialog
        .open(this.workerFormTemplate, { data: dialogData })
        .afterClosed()
        .subscribe((responseEntity) => {
          resolve(responseEntity);
        });
    });
  }
}
