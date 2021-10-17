import { Component, OnInit } from '@angular/core';
import { DataTableConsumer } from 'src/app/misc/data-table/data-table-consumer';
import { DataTableOptions } from 'src/app/misc/data-table/data-table-options';
import { WorkerService } from 'src/app/services/worker/worker.service';
import { Worker } from 'src/app/models/worker.model';

@Component({
  selector: 'app-workers-view',
  templateUrl: './workers-view.component.html',
  styleUrls: ['./workers-view.component.sass']
})
export class WorkersViewComponent implements OnInit, DataTableConsumer<Worker> {
  public entityClass = Worker;
  public displayColumns = ['id', 'lastName', 'firstName', 'middleName'];
  public tableOptions: DataTableOptions = {
    actions: {
      add: true,
      edit: true,
      view: true,
      delete: true
    }
  }

  constructor(private readonly _workerService: WorkerService) { }
  public getAll(): Promise<Worker[]> {
    return this._workerService.getAll().toPromise();
  }

  ngOnInit(): void {
  }

  public delete(entityModel: Worker): Promise<Worker> {
    return this._workerService.delete(entityModel).toPromise();
  }
}
