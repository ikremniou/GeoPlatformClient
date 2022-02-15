import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ClassConstructor } from 'class-transformer';
import { DataTableConsumer } from 'src/app/misc/data-table/data-table-consumer';
import { DataTableOptions } from 'src/app/misc/data-table/data-table-options';
import { DialogData } from 'src/app/misc/entity-dialog-data';
import { TimeReport } from 'src/app/models/time-report/time-report.model';
import { HeaderService } from 'src/app/services/header/header.service';
import { TimeReportService } from 'src/app/services/time-hub/time-report.service';
import { DialogService } from 'src/app/services/ui/dialog/dialog.service';
import { timeReportMessages } from './locale';

@Component({
  selector: 'app-time-reports',
  templateUrl: './time-reports.component.html',
  styleUrls: ['./time-reports.component.sass'],
})
export class TimeReportsComponent implements DataTableConsumer<TimeReport> {
  public displayColumns: string[] = ['id', 'date'];
  public tableOptions: DataTableOptions = {
    actions: {
      add: true,
      delete: true,
      edit: true,
      view: true,
    },
  };
  public entity: ClassConstructor<TimeReport> = TimeReport;

  @ViewChild('timeReportForm')
  public timeReportForm!: TemplateRef<any>;

  constructor(
    public readonly timeReportService: TimeReportService,
    headerService: HeaderService,
    private readonly _dialogService: DialogService,
  ) {
    headerService.changedHeader(timeReportMessages.header);
  }

  public getAll(): Promise<TimeReport[]> {
    return this.timeReportService.getAll().toPromise();
  }

  public add(): Promise<TimeReport> {
    const data: DialogData<TimeReport> = {
      form: {
        type: {
          isAdd: true,
        },
      },
      title: timeReportMessages.addTimeReport,
    };

    return this._dialogService.open(this.timeReportForm, data);
  }
}
