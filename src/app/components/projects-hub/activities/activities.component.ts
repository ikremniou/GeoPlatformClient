import { Component, TemplateRef, ViewChild } from '@angular/core';
import { DataTableConsumer } from 'src/app/misc/data-table/data-table-consumer';
import { DataTableOptions } from 'src/app/misc/data-table/data-table-options';
import { DialogData } from 'src/app/misc/entity-dialog-data';
import { Activity } from 'src/app/models/activity/activity.model';
import { HeaderService } from 'src/app/services/header/header.service';
import { DialogService } from 'src/app/services/ui/dialog/dialog.service';
import { ActivityService } from 'src/app/services/work-hub/activity/activity.service';
import { activityMessages } from './locale/ru/activity-messages.ru';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.sass'],
})
export class ActivitiesComponent implements DataTableConsumer<Activity> {
  public entity = Activity;
  public tableOptions: DataTableOptions = {
    actions: { add: true, delete: true, view: true, edit: true },
  };
  public displayColumns = ['id', 'summary', 'description', 'project'];
  @ViewChild('activityForm')
  public activityForm!: TemplateRef<any>;

  constructor(
    headerService: HeaderService,
    public readonly activityService: ActivityService,
    private readonly _dialogService: DialogService,
  ) {
    headerService.changedHeader(activityMessages.header);
  }
  public getAll(): Promise<Activity[]> {
    return this.activityService.getAll().toPromise();
  }

  public add(): Promise<Activity> {
    const dialogData: DialogData<Activity> = {
      form: {
        type: {
          isAdd: true,
        },
      },
      title: activityMessages.addActivity,
    };

    return this._dialogService.open<Activity>(this.activityForm, dialogData);
  }

  public edit(activity: Activity): Promise<Activity> {
    const dialogData: DialogData<Activity> = {
      form: {
        type: {
          isEdit: true,
        },
        model: activity,
      },
      title: activityMessages.editActivity,
    };

    return this._dialogService.open<Activity>(this.activityForm, dialogData);
  }

  public async view(activity: Activity): Promise<void> {
    const dialogData: DialogData<Activity> = {
      form: {
        type: {
          isView: true,
        },
        model: activity,
      },
      title: activityMessages.viewActivity,
    };

    await this._dialogService.open<Activity>(this.activityForm, dialogData);
  }

  public async delete(activity: Activity): Promise<void> {
    await this.activityService.delete(activity).toPromise();
  }
}
