import { Component, TemplateRef, ViewChild } from '@angular/core';
import { DataTableConsumer } from 'src/app/misc/data-table/data-table-consumer';
import { DataTableOptions } from 'src/app/misc/data-table/data-table-options';
import { DialogData } from 'src/app/misc/entity-dialog-data';
import { WorkerCategory } from 'src/app/models/worker-category/worker-category.model';
import { HeaderService } from 'src/app/services/header/header.service';
import { DialogService } from 'src/app/services/ui/dialog/dialog.service';
import { WorkerCategoryService } from 'src/app/services/worker/category/worker-category.service';
import { workersHubMessages } from '../locale';
import { workerCategoriesMessages } from './locale';

@Component({
  selector: 'app-worker-categories',
  templateUrl: './worker-categories.component.html',
  styleUrls: ['./worker-categories.component.sass'],
})
export class WorkerCategoriesComponent implements DataTableConsumer<WorkerCategory> {
  @ViewChild('categoryForm')
  public categoryForm!: TemplateRef<any>;

  public entity = WorkerCategory;
  public displayColumns: string[] = ['id', 'name'];
  public tableOptions: DataTableOptions = {
    actions: {
      add: true,
      edit: true,
      delete: true,
      view: true,
    },
  };

  constructor(
    headerService: HeaderService,
    public readonly categoryService: WorkerCategoryService,
    private readonly _dialogService: DialogService,
  ) {
    headerService.changedHeader(workersHubMessages.categories);
  }

  public getAll(): Promise<WorkerCategory[]> {
    return this.categoryService.getAll().toPromise();
  }

  public add(): Promise<WorkerCategory> {
    const dialogData: DialogData<WorkerCategory> = {
      form: {
        type: {
          isAdd: true,
        },
      },
      title: workerCategoriesMessages.addCategory,
    };

    return this._dialogService.open<WorkerCategory>(this.categoryForm, dialogData);
  }

  public async view(category: WorkerCategory): Promise<void> {
    const dialogData: DialogData<WorkerCategory> = {
      form: {
        type: {
          isView: true,
        },
        model: category
      },
      title: workerCategoriesMessages.viewCategory,
    };

    await this._dialogService.open<WorkerCategory>(this.categoryForm, dialogData);
  }

  public edit(category: WorkerCategory): Promise<WorkerCategory> {
    const dialogData: DialogData<WorkerCategory> = {
      form: {
        type: {
          isEdit: true,
        },
        model: category
      },
      title: workerCategoriesMessages.editCategory,
    };

    return this._dialogService.open<WorkerCategory>(this.categoryForm, dialogData);
  }

  public async delete(category: WorkerCategory): Promise<void> {
    await this.categoryService.delete(category).toPromise();
  }
}
