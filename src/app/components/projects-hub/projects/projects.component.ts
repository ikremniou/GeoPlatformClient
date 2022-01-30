import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DataTableConsumer } from 'src/app/misc/data-table/data-table-consumer';
import { DataTableOptions } from 'src/app/misc/data-table/data-table-options';
import { DialogData } from 'src/app/misc/entity-dialog-data';
import { Project } from 'src/app/models/projects/project.model';
import { HeaderService } from 'src/app/services/header/header.service';
import { DialogService } from 'src/app/services/ui/dialog/dialog.service';
import { ProjectService } from 'src/app/services/work-hub/project/project.service';
import { projectMessages } from './locale';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass'],
})
export class ProjectsComponent implements DataTableConsumer<Project> {
  public entity = Project;
  public tableOptions: DataTableOptions = {
    actions: {
      add: true,
      delete: true,
      edit: true,
      view: true,
    },
  };
  public displayColumns = ['id', 'name', 'summary', 'startDate', 'endDate']

  @ViewChild('projectForm')
  public projectForm!: TemplateRef<any>;

  constructor(
    headerService: HeaderService,
    public readonly projectService: ProjectService,
    private readonly _dialogService: DialogService,
  ) {
    headerService.changedHeader(projectMessages.header);
  }

  public getAll(): Promise<Project[]> {
    return this.projectService.getAll().toPromise();
  }

  public add(): Promise<Project> {
    const dialogData: DialogData<Project> = {
      form: {
        type: {
          isAdd: true,
        },
      },
      title: projectMessages.addProject,
    };

    return this._dialogService.open<Project>(this.projectForm, dialogData);
  }

  public edit(entity: Project): Promise<Project> {
    throw new Error('Method not implemented.');
  }

  public view(entity: Project): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public delete(entity: Project): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
