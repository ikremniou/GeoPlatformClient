import { Component, TemplateRef, ViewChild } from '@angular/core';
import { DataTableConsumer } from 'src/app/misc/data-table/data-table-consumer';
import { DataTableOptions } from 'src/app/misc/data-table/data-table-options';
import { DialogData } from 'src/app/misc/entity-dialog-data';
import { WorkerPosition } from 'src/app/models/worker-position/worker-position.model';
import { HeaderService } from 'src/app/services/header/header.service';
import { DialogService } from 'src/app/services/ui/dialog/dialog.service';
import { WorkerPositionService } from 'src/app/services/worker/position/worker-position.service';
import { workersHubMessages } from '../locale';
import { workerPositionsMessages } from './locale';

@Component({
  selector: 'app-worker-positions',
  templateUrl: './worker-positions.component.html',
  styleUrls: ['./worker-positions.component.sass'],
})
export class WorkerPositionsComponent implements DataTableConsumer<WorkerPosition> {
  @ViewChild('positionForm')
  public positionForm!: TemplateRef<any>;

  public entity = WorkerPosition;
  public displayColumns: string[] = ['id', 'name', 'baseSalary'];
  public tableOptions: DataTableOptions = {
    actions: {
      add: true,
    },
  };

  constructor(
    headerService: HeaderService,
    public readonly positionService: WorkerPositionService,
    private readonly _platformDialog: DialogService,
  ) {
    headerService.changedHeader(workersHubMessages.positions);
  }

  public getAll(): Promise<WorkerPosition[]> {
    return this.positionService.getAll().toPromise();
  }

  public add(): Promise<WorkerPosition> {
    const dialogData: DialogData<WorkerPosition> = {
      form: {
        type: {
          isAdd: true,
        },
      },
      title: workerPositionsMessages.addPosition,
    };

    return this._platformDialog.open<WorkerPosition>(this.positionForm, dialogData);
  }
}
