import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { localeMessages } from 'src/app/local-locale';
import { DataTableOptions } from 'src/app/misc/data-table/data-table-options';
import { DataTableField, dataTableMetadataStore, EntityMetadata } from 'src/app/misc/data-table/metadata-store';
import { DataTableConsumer } from 'src/app/misc/data-table/data-table-consumer';
import { MatColumnDef, MatHeaderRowDef, MatRowDef, MatTable } from '@angular/material/table';

interface Constructable<T> {
  name: string;
  new (): T;
}

interface SomeInt {
  fieldName: string,
  template: TemplateRef<any>
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.sass'],
})
export class DataTableComponent<EntityType> implements OnInit, AfterContentInit {
  @ContentChildren(MatHeaderRowDef) public headerRowDefs!: QueryList<MatHeaderRowDef>;
  @ContentChildren(MatRowDef) public rowDefs!: QueryList<MatRowDef<EntityType>>;
  @ContentChildren(MatColumnDef) public columnDefs!: QueryList<MatColumnDef>;
  @ViewChild(MatTable, { static: true }) public wrappedTable!: MatTable<EntityType>;

  public tableMessage?: string;
  public hoveredEntry?: EntityType;
  public isDataLoading = true;
  @Input('entity')
  public entityClass!: Constructable<EntityType>;
  @Input('columns')
  public displayColumns: string[] = [];
  @Input('source')
  public consumer!: DataTableConsumer<EntityType>;
  @Input('options')
  public dataTableOptions?: DataTableOptions;
  @Input('templates')
  public templates?: [string, TemplateRef<any>][];
  public customTemplates!: Map<string, TemplateRef<any>>;

  public tableDescription?: DataTableField[];
  public entityMetadata?: EntityMetadata;
  public dataSource: EntityType[] = [];

  constructor() {}
  public ngAfterContentInit(): void {
    this.columnDefs.forEach((columnDef) => this.wrappedTable.addColumnDef(columnDef));
    this.rowDefs.forEach((rowDef) => this.wrappedTable.addRowDef(rowDef));
    this.headerRowDefs.forEach((headerRowDef) => this.wrappedTable.addHeaderRowDef(headerRowDef));
  }

  public ngOnInit(): void {
    this.customTemplates = new Map(this.templates);
    this.handleTableOptions(this.dataTableOptions);
    this.tableDescription = dataTableMetadataStore.getFields(this.entityClass.name);
    this.entityMetadata = dataTableMetadataStore.getEntityMetadata(this.entityClass.name);
    this.getTableData();
  }

  public handleTableOptions(dataTableOptions?: DataTableOptions) {
    if (dataTableOptions) {
      if (dataTableOptions.actions?.delete || dataTableOptions.actions?.edit || dataTableOptions.actions?.view) {
        this.displayColumns.push('actions');
      }
    }
  }

  public async addEntity(): Promise<void> {
    if (!this.consumer.add) {
      console.warn('[DataTable] Unable to add entity without consumer implementation');
      return;
    }

    const newEntity = await this.consumer.add();
    if (newEntity) {
      this.tableMessage = undefined;
      this.dataSource = this.dataSource.concat(newEntity);
    }
  }

  public async editEntity(entityModel: EntityType): Promise<void> {
    if (entityModel) {
      if (!this.consumer.edit) {
        console.warn('[DataTable] Unable to edit the entity without consumer implementation');
        return;
      }

      const editedModel = await this.consumer.edit(entityModel);
      if (editedModel) {
        Object.assign(entityModel, editedModel);
      }
    }
  }

  public async viewEntity(entityModel: EntityType): Promise<void> {
    if (entityModel) {
      if (!this.consumer.view) {
        console.warn('[DataTable] Unable to view the entity without consumer implementation');
        return;
      }
      await this.consumer.view(entityModel);
    }
  }

  public async deleteEntity(entityModel: EntityType): Promise<void> {
    if (entityModel) {
      if (!this.consumer.delete) {
        console.warn('[DataTable] Unable to delete the entity without consumer implementation');
        return;
      }

      await this.consumer.delete(entityModel);
      this.deleteFromTable(entityModel);
    }
  }

  public rowEnter(hoveredEntry: EntityType) {
    this.hoveredEntry = hoveredEntry;
  }

  public rowExit() {
    this.hoveredEntry = undefined;
  }

  private async getTableData(): Promise<void> {
    const entities = await this.consumer.getAll();
    this.isDataLoading = false;
    this.dataSource = entities;
    if (entities.length === 0) {
      this.tableMessage = localeMessages.noDataEntriesInTable;
    }
  }

  private deleteFromTable(entityModel: EntityType): void {
    this.dataSource = this.dataSource.filter((model) => model !== entityModel);
    if (this.dataSource.length === 0) {
      this.tableMessage = localeMessages.noDataEntriesInTable;
    }
  }
}
