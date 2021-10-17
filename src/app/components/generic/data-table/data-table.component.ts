import { Component, Input, OnInit } from '@angular/core';
import { localeMessages, modelLocaleStrings } from 'src/app/local-locale';
import { DataTableOptions } from 'src/app/misc/data-table/data-table-options';
import { DataService } from 'src/app/misc/service/data-service';
import { DataTableField, dataTableMetadataStore, EntityMetadata } from 'src/app/misc/data-table/metadata-store';
import { DataTableConsumer } from 'src/app/misc/data-table/data-table-consumer';

interface Constructable<T> {
  name: string;
  new (): T;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.sass'],
})
export class DataTableComponent<EntityType> implements OnInit {
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

  public tableDescription?: DataTableField[];
  public entityMetadata?: EntityMetadata;
  public dataSource: EntityType[] = [];

  constructor() {}

  public ngOnInit(): void {
    this.handleTableOptions(this.dataTableOptions);
    this.tableDescription = dataTableMetadataStore.getFields(this.entityClass.name);
    this.entityMetadata = dataTableMetadataStore.getEntityMetadata(this.entityClass.name);
    this.getTableData();
  }

  public handleTableOptions(dataTableOptions?: DataTableOptions) {
    if (dataTableOptions) {
      if (dataTableOptions.actions) {
        this.displayColumns.push('actions');
      }
    }
  }

  public async editEntity(entityModel: EntityType): Promise<void> {
    if (entityModel) {
      const editedModel = await this.consumer.edit?.(entityModel);
      if (editedModel) {
        Object.assign(entityModel, editedModel);
      }
    }
  }

  public async viewEntity(entityModel: EntityType): Promise<void> {
    if (entityModel) {
      await this.consumer.view?.(entityModel);
    }
  }

  public async deleteEntity(entityModel: EntityType): Promise<void> {
    if (entityModel) {
      await this.consumer.delete?.(entityModel);
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
